const TMI = require('tmi.js');

/****************************************************************************************************
 *
 * The Twitch Class is a controller self connects to Twitch.tv through the TMI library via Twitch APIs
 *
 ****************************************************************************************************/
class ircParser {
    constructor(options) {
        this.socket = null;
        //
        this.client = null;
        this.debug = false;
        this.channel = null;
        this.timer = null;
        this.timeSinceLast = null;
        this.whitelist = null;
        this.disableWhitelist = true;
        this.botActivated = false;
        this.allowModAsAdmin = true;
        this.lastBotMessage = null;
        this.disableBotFeedbackOnSend = true;
        this.botName = 'windfishbot';
        this.approvedCommand = '!tracker';
        this.storageKeyName = 'windfishTwitchWhitelist';
        this.timeSinceLast = 0;
        this.commandDelay = 5;

        Object.assign(this, options);
    }

    /***********************************************************************************************
     *
     * Connect to Twitch via TMI
     *
     * @param {Object} config - Values needed for TMI to connect to Twitch
     * @param {Object} api - The Tracker class for bidirectional utilization
     *
     ***********************************************************************************************/
    connect(config = {}) {
        let self = this;

        this.channel = config.channels[0]; // ehhhhhhh
        this.socket = config.socket;

        this.client = new TMI.client(config);
        this.client
            .connect()
            .then(data => {
                self.parseMessage('online');
                self.watchChat();
            })
            .catch(error => {
                console.error(error);
            });
    }

    disconnect() {
        this.client.disconnect();
    }

    watchChat() {
        let that = this;
        let channel = that.channel;

        that.client.on('chat', (channel, user, message, self) => {
            let sentMessage = message.split(' ');
            let commandCheck = sentMessage[0];
            let argument1 = sentMessage[1];
            let argument2 = sentMessage[2];

            if (commandCheck == that.approvedCommand) {
                if (
                    user.username === this.botName ||
                    !that.timeSinceLast ||
                    that.timeSinceLast !== that.commandDelay
                ) {
                    let userData = {
                        isBroadcaster: user.badges
                            ? (user.badges.broadcaster = '1' ? true : false)
                            : false,
                        isSubscriber: user.subscriber,
                        isWhitelisted: null,
                        isAuthorized: null,
                        isMod: user.mod,
                        username: user.username,
                        argument1: argument1,
                        argument2: argument2,
                    };

                    that.doUserCommand(userData);
                }
            }
        });
    }

    // A mini-controller for checking which command to execute on the trackers
    doUserCommand(userData) {
        let self = this;

        // let whitelisted = self.whitelist.indexOf(userData.username) > -1;

        userData.isAuthorized =
            userData.isBroadcaster || (self.allowModAsAdmin && userData.isMod);
        userData.isWhitelisted =
            userData.isAuthorized || self.disableWhitelist || whitelisted;

        if (!self.botActivated) {
            /***********
             *
             * Needs to activate
             *
             ***********/
            switch (userData.argument1) {
                case 'activate':
                case 'deactivate':
                    if (userData.isAuthorized) {
                        self.parseMessage(userData.argument1);

                        self.botActivated =
                            userData.argument1 == 'activate' ? true : false;
                    }
                    break;

                default:
                    if (
                        !self.timeSinceLast ||
                        self.timeSinceLast >= self.inactiveCommandDelay
                    ) {
                        self.parseMessage('inactive');
                    }
                    break;
            }
        } else {
            /****************
             *
             * Public commands
             *
             ****************/
            if (!userData.argument1 || userData.argument1 === 'commands') {
                self.parseMessage('commands');
            } else {
                /********************
                 *
                 * Registered Commands
                 *
                 ********************/
                switch (userData.argument1) {
                    /*******************
                     *
                     * Whitelist commands
                     *
                     *******************/
                    case 'add':
                    case 'remove':
                    case 'disable':
                    case 'enable':
                        if (userData.isAuthorized) {
                            if (
                                userData.argument1 === 'disable' &&
                                userData.argument2 === 'whitelist'
                            ) {
                                self.disableWhitelist = true;
                                self.parseMessage('disable');
                            } else if (
                                userData.argument1 === 'enable' &&
                                userData.argument2 === 'whitelist'
                            ) {
                                self.disableWhitelist = false;
                                self.parseMessage('enable');
                            } else {
                                // self.getSetWhitelist(
                                //     userData.argument1,
                                //     userData.argument2
                                // );
                            }
                        } else {
                            self.parseMessage(
                                'unauthorized',
                                userData.username
                            );
                            return;
                        }
                        break;

                    /*********************
                     *
                     * Whitelisted commands
                     *
                     *********************/
                    default:
                        if (userData.isWhitelisted) {
                            if (!self.disableBotFeedbackOnSend) {
                                self.parseMessage('send', userData.username);
                            }

                            self.socket.emit(
                                'update tracker data',
                                userData.argument1
                            );
                        }

                        /******************************
                         *
                         * Whitelisted command attempted
                         *
                         ******************************/
                        if (!userData.isWhitelisted) {
                            self.parseMessage('help', userData.username);
                        }
                        break;
                }
            }
        }

        // Spam filter
        // self.startDelayTimer();
    }

    // A throttle counter to keep track of the messages sent to the Tracker
    startDelayTimer() {
        let self = this;

        self.timeSinceLast = 0;

        clearInterval(self.timer);

        self.timer = setInterval(() => {
            if (self.timeSinceLast !== self.commandDelay) {
                self.timeSinceLast++;
            } else {
                clearInterval(self.timer);
            }
        }, 1000);
    }

    sendMessage(message) {
        let that = this;
        let prependString = '/me ~> ';
        let fullMessage = prependString + message;

        // Silly way to prevent identical messaging for Twitch spam filter
        if (that.lastBotMessage === fullMessage) {
            fullMessage = fullMessage.replace('~', '-');
        }

        that.lastBotMessage = fullMessage;

        if (typeof message === 'string') {
            that.client.say(that.channel, fullMessage).catch(function(error) {
                console.error(error);
            });
        } else {
            console.error(
                'Error :: sendMessage() tried to fire without a message.'
            );
        }
    }

    parseMessage(modifier = null, username) {
        switch (modifier) {
            // +------------------+
            // |                  |
            // |  Bot Activation  |
            // |                  |
            // +------------------+
            case 'online':
                this.sendMessage(
                    `The Windfish has joined. The broadcaster must type "${
                        this.approvedCommand
                    } activate" to allow the chat to edit the tracker.`
                );
                break;

            case 'activate':
                this.sendMessage(
                    `Windfish and "${
                        this.approvedCommand
                    }" command is now active!`
                );
                break;

            case 'deactivate':
                this.sendMessage(`Windfish has been deactivated.`);
                break;

            case 'inactive':
                this.sendMessage(
                    `Windfish is inactive. The channel broadcaster must type "${
                        this.approvedCommand
                    } activate" to allow the chat to adjust the tracker.`
                );
                break;

            // +-------------------+
            // |                   |
            // |  Public Messages  |
            // |                   |
            // +-------------------+
            case 'commands':
                this.sendMessage(
                    `For a list of Windfish commands check out http://windfish.io/COMMANDS.md`
                );
                break;

            case 'help':
                this.sendMessage(
                    `Hey ${
                        this.channel
                    }, it looks like ${username} is trying to use the tracker. Would you like to add them to the whitelist?`
                );
                break;

            case 'unauthorized':
                this.sendMessage(
                    `Sorry ${username}, this is a reserved command for admins ${
                        this.allowModAsAdmin ? 'and moderators' : ''
                    }.`
                );
                break;

            // +------------------+
            // |                  |
            // |  User Whitelist  |
            // |                  |
            // +------------------+
            case 'enable':
                this.sendMessage(`The whitelist has been enabled.`);
                break;

            case 'disable':
                this.sendMessage(`The whitelist has been disabled.`);
                break;

            case 'add':
                this.sendMessage(`Added ${username} to the whitelist!`);
                break;

            case 'remove':
                this.sendMessage(
                    `Removed ${username} from the whitelist! Maybe they should have bonked a few less trees...`
                );
                break;

            case 'exists':
                this.sendMessage(`${username} is already on the whitelist!`);
                break;

            case 'not-exists':
                this.sendMessage(`${username} is not on the whitelist!`);
                break;

            case 'error-exp':
                this.sendMessage(
                    `Whitelist data could not be retrieved or edited, but the server was able to connect!`
                );
                break;

            case 'error':
                this.sendMessage(`Ganon has kidnapped the whitelist!`);
                break;

            case 'send':
                this.sendMessage(`WHRRRRRRLLL, ${username}!`);

            default:
                this.sendMessage(
                    `"Someday, thou may recall this island... self memory must be the real dream world."`
                );
                break;
        }
    }
}

module.exports = ircParser;
