const TMI = require('tmi.js');

/****************************************************************************************************
 *
 * The Twitch Class is a controller self connects to Twitch.tv through the TMI library via Twitch APIs
 *
 ****************************************************************************************************/
class Bot {
    constructor(options) {
        this.socket = null;
        //
        this.client = null;
        this.debug = false;
        this.channel = null;
        this.timer = null;
        this.timeSinceLast = null;
        this.whitelist = false;
        this.disableWhitelist = false;
        this.botActivated = false;
        this.allowModAsAdmin = true;
        this.lastBotMessage = null;
        this.disableBotFeedbackOnSend = true;
        this.approvedCommands = ['!tracker', '!t'];

        Object.assign(this, options);
    }

    updateWhitelist(whitelist) {
        console.log(whitelist);

        this.whitelist = whitelist.whitelist;

        switch (whitelist.response.type) {
            case 'add':
                this.parseMessage('add', whitelist.response.username);
                break;

            case 'remove':
                this.parseMessage('remove', whitelist.response.username);
                break;
        }
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

            if (that.approvedCommands.indexOf(commandCheck) > -1) {
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
        });
    }

    // A mini-controller for checking which command to execute on the trackers
    doUserCommand(userData) {
        let self = this;

        let whitelisted = self.whitelist.indexOf(userData.username) > -1;

        userData.isAuthorized =
            userData.isBroadcaster || (self.allowModAsAdmin && userData.isMod);
        userData.isWhitelisted =
            userData.isAuthorized || self.disableWhitelist || whitelisted;

        if (!userData.argument1) {
            self.parseMessage('online');
        } else if (userData.argument1 === 'commands') {
            self.parseMessage('commands');
        } else if (userData.isAuthorized) {
            /*******************
             *
             * Admin Commands
             *
             *******************/
            switch (userData.argument1) {
                case 'add':
                    self.socket.emit(
                        'update whitelist add',
                        userData.argument2
                    );
                    break;

                case 'remove':
                    self.socket.emit(
                        'update whitelist remove',
                        userData.argument2
                    );
                    break;

                case 'enable':
                    self.disableWhitelist = false;
                    self.parseMessage('enable');
                    break;

                case 'disable':
                    self.disableWhitelist = true;
                    self.parseMessage('disable');
                    break;

                case 'activate':
                    self.botActivated = true;
                    self.parseMessage('activate');
                    break;

                case 'deactivate':
                    self.botActivated = false;
                    self.parseMessage('deactivate');
                    break;

                case 'dismiss':
                    self.disconnect();
                    break;
            }
        } else {
            self.parseMessage('default');
        }

        if (!self.botActivated) {
            self.parseMessage('inactive');
        } else {
            /****************
             *
             * Public commands
             *
             ****************/
            if (userData.argument1 === 'update') {
                if (userData.isWhitelisted) {
                    if (!self.disableBotFeedbackOnSend) {
                        self.parseMessage('send', userData.username);
                    }

                    self.socket.emit('update tracker data', userData.argument2);
                } else {
                    self.parseMessage('help', userData.username);
                }
            } else {
                self.parseMessage('invalid', userData.username);
            }
        }
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
                    `The Windfish has joined the channel. The broadcaster must type "${
                        this.approvedCommands[0]
                    } activate" to allow the chat to edit the tracker.`
                );
                break;

            case 'activate':
                this.sendMessage(
                    `Windfish and "${
                        this.approvedCommands[0]
                    }" command is now active!`
                );
                break;

            case 'deactivate':
                this.sendMessage(`Windfish has been deactivated.`);
                break;

            case 'inactive':
                this.sendMessage(
                    `Windfish is inactive. The channel broadcaster must type "${
                        this.approvedCommands[0]
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

            case 'invalid':
                this.sendMessage(
                    `Sorry ${username}, this is not a valid command.`
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
                this.sendMessage(`Removed ${username} from the whitelist!`);
                break;

            // +---------+
            // |         |
            // |  Basic  |
            // |         |
            // +---------+

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

module.exports = Bot;
