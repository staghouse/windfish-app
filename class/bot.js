const TMI = require('tmi.js');

// TODO: Event Queue that is Promise based on the client say method

class Bot {
    constructor(options) {
        this.debug = true;
        this.socket = null;
        this.identity = null;
        this.client = null;
        this.channel = null;
        this.whitelist = false;
        this.disableWhitelist = false;
        this.botActivated = true;
        this.allowModAsAdmin = true;
        this.lastBotMessage = null;
        this.disableBotFeedbackOnSend = false;
        this.approvedCommands = ['!tracker', '!t', '!hud'];

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

    connect(config) {
        let self = this;

        this.identity = config.identity.username.toLowerCase();
        this.channel = config.channels[0];
        this.socket = config.socket;

        this.client = new TMI.client(config);
        this.client
            .connect()
            .then(data => {
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

        that.client.on('chat', (channel, user, message, self) => {
            let sentMessage = message.split(' ');
            let commandCheck = sentMessage[0];

            if (user.username !== that.identity) {
                let argument1 = sentMessage[1];
                let argument2 = sentMessage[2];

                if (that.approvedCommands.indexOf(commandCheck) > -1) {
                    let userData = {
                        displayName: user['display-name'],
                        username: user.username,
                        isBroadcaster: user.badges
                            ? Boolean(parseInt(user.badges.broadcaster))
                            : false,
                        isSubscriber: user.subscriber,
                        isMod: user.mod,
                        argument1: argument1,
                        argument2: argument2,
                        isWhitelisted: null,
                        isAuthorized: null,
                    };

                    that.doUserCommand(userData);
                }
            }
        });
    }

    doUserCommand(userData) {
        let whitelisted = this.whitelist.indexOf(userData.username) > -1;

        userData.isAuthorized =
            this.debug ||
            userData.isBroadcaster ||
            (this.allowModAsAdmin && userData.isMod);
        userData.isWhitelisted =
            userData.isAuthorized || this.disableWhitelist || whitelisted;

        if (userData.isAuthorized) {
            switch (userData.argument1) {
                case 'add':
                    this.socket.emit(
                        'update whitelist add',
                        userData.argument2
                    );
                    break;

                case 'remove':
                    this.socket.emit(
                        'update whitelist remove',
                        userData.argument2
                    );
                    break;

                case 'enable':
                    this.disableWhitelist = false;
                    this.parseMessage('enable');
                    break;

                case 'disable':
                    this.disableWhitelist = true;
                    this.parseMessage('disable');
                    break;

                case 'activate':
                    this.botActivated = true;
                    this.parseMessage('activate');
                    break;

                case 'deactivate':
                    this.botActivated = false;
                    this.parseMessage('deactivate');
                    break;

                case 'dismiss':
                    this.disconnect();
                    break;

                //
                // case 'update':
                //     if (!userData.argument2) {
                //         this.parseMessage('invalid', userData.username);
                //     } else {
                //         this.parseMessage('send', userData.username);
                //         this.socket.emit(
                //             'update tracker data',
                //             userData.argument2
                //         );
                //     }
                //     break;

                // default:
                //     if (!userData.argument1) {
                //         this.parseMessage('default');
                //     } else {
                //         this.parseMessage('invalid');
                //     }
                //     break;
            }
        }

        if (userData.isWhitelisted && this.botActivated) {
            switch (userData.argument1) {
                case 'update':
                    if (!userData.argument2) {
                        this.parseMessage('invalid', userData.username);
                    } else {
                        this.parseMessage('send', userData.username);
                        this.socket.emit(
                            'update tracker data',
                            userData.argument2
                        );
                    }
                    break;

                default:
                    if (!userData.argument1) {
                        this.parseMessage('default');
                    } else {
                        this.parseMessage('invalid');
                    }
                    break;
            }
        } else {
            this.parseMessage('help', userData.displayName);
        }

        // if (!this.botActivated) {
        //     this.parseMessage('inactive', userData.displayName);
        // }
    }

    sendMessage(message) {
        let channel = this.channel;

        // Pevent identical messaging for Twitch spam filter
        if (this.lastBotMessage === message) {
            message = message.replace('~', '-');
        }

        this.lastBotMessage = message;

        this.client.say(channel, message).catch(error => {
            console.error(error);
        });
    }

    parseMessage(modifier, argument) {
        switch (modifier) {
            // +-------------------+
            // |                   |
            // |  Public Messages  |
            // |                   |
            // +-------------------+
            case 'help':
                this.sendMessage(
                    `/me ~> Hey ${
                        this.channel
                    }, it looks like ${argument} is trying to use the tracker. Would you like to add them to the whitelist?`
                );
                break;

            case 'invalid':
                this.sendMessage(
                    `/me ~> Sorry ${argument}, this is not a valid command.`
                );
                break;

            // +------------------+
            // |                  |
            // |  Bot Activation  |
            // |                  |
            // +------------------+
            case 'online':
                this.sendMessage(
                    `/me ~> The Wind Fish has joined the channel, ${
                        this.channel
                    } must type "${
                        this.approvedCommands[0]
                    } activate" to activate it.`
                );
                break;

            case 'activate':
                this.sendMessage(
                    `/me ~> The Wind Fish and "${
                        this.approvedCommands[0]
                    }" command is now active!`
                );
                break;

            case 'deactivate':
                this.sendMessage(`/me ~> The Wind Fish has been deactivated.`);
                break;

            case 'inactive':
                this.sendMessage(
                    `/me ~> The Wind Fish is inactive. The channel broadcaster must type "${
                        this.approvedCommands[0]
                    } activate" to allow the chat to adjust the tracker.`
                );
                break;

            // +------------------+
            // |                  |
            // |  User Whitelist  |
            // |                  |
            // +------------------+
            case 'enable':
                this.sendMessage(`/me ~> The whitelist has been enabled.`);
                break;

            case 'disable':
                this.sendMessage(`/me ~> The whitelist has been disabled.`);
                break;

            case 'add':
                this.sendMessage(`/me ~> Added ${argument} to the whitelist!`);
                break;

            case 'remove':
                this.sendMessage(
                    `/me ~> Removed ${argument} from the whitelist!`
                );
                break;

            // +---------+
            // |         |
            // |  Basic  |
            // |         |
            // +---------+
            case 'send':
                this.sendMessage(`/me ~> WHRRRRRRLLL, ${argument}!`);
                break;

            // +-------------------+
            // |                   |
            // |  Nothing left...  |
            // |                   |
            // +-------------------+
            default:
                this.sendMessage(
                    `/me ~> "Someday, thou may recall this island... self memory must be the real dream world."`
                );
                break;
        }
    }
}

module.exports = Bot;
