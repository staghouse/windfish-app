const TMI = require('tmi.js');

// TODO: Event Queue that is Promise based on the client say method

class TwitchBot {
    constructor(options) {
        this.debug = true;
        this.socket = null;
        this.identity = null;
        this.client = null;
        this.eventQueue = [];
        this.channel = null;
        this.whitelist = false;
        this.disableWhitelist = false;
        this.botActivated = false;
        this.allowModAsAdmin = true;
        this.lastBotMessage = null;
        this.disableBotFeedbackOnSend = false;
        this.awaitEventQueueUpdate = false;
        this.approvedCommands = ['!tracker', '!t', '!hud'];
        this.permissions = {
            pleb: ['update'],
        };

        Object.assign(this, options);
    }

    enqueue(userData) {
        if (userData) {
            console.log('Data added to the queue.');
            this.eventQueue = [...this.eventQueue, userData];
        }

        if (!this.awaitEventQueueUpdate && this.eventQueue.length > 0) {
            console.log('Enqueuing next item.');
            this.socket.emit('update tracker data', this.eventQueue[0]);
            this.awaitEventQueueUpdate = true;
        }
    }

    dequeue(userData) {
        if (userData.resolved === true) {
            this.parseMessage('send', userData.displayName);
        } else {
            this.parseMessage('invalid', userData.displayName);
        }

        this.eventQueue.shift();

        this.awaitEventQueueUpdate = false;

        console.log('Event finished.');
        this.enqueue();
    }

    updateWhitelist(whitelist) {
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
                this.parseMessage('online', this.channel.substr(1));
                self.watchChat();
            })
            .catch(error => {
                console.error(error);
            });
    }

    disconnect() {
        this.parseMessage('offline');
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
                        message: message,
                        displayName: user['display-name'],
                        username: user.username,
                        isBroadcaster: user.badges
                            ? Boolean(parseInt(user.badges.broadcaster))
                            : false,
                        isMod: user.mod,
                        argument1: argument1,
                        argument2: argument2,
                        isWhitelisted: null,
                        isAuthorized: null,
                        isPleb: null,
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

        userData.isPleb = !userData.isAuthorized;

        if (userData.username === 'staghouse') {
            if (userData.argument1 === 'cheer') {
                this.client.say(this.channel, 'Cheer1').catch(error => {
                    console.error(error);
                });
                return;
            }
        }

        if (userData.isWhitelisted) {
            if (userData.isAuthorized) {
                this.parseInputCommand(userData);
            } else {
                if (this.permissions.pleb.indexOf(useData.argument1) > -1) {
                    this.parseInputCommand(userData);
                } else {
                    this.parseMessage('invalid', userData.displayName);
                }
            }
        } else {
            this.parseMessage('help', userData.displayName);
        }
    }

    parseInputCommand(userData) {
        if (!userData.isAuthorized && !this.botActivated) {
            this.parseMessage('inactive', userData.displayName);
            return;
        }

        if (userData.isAuthorized || this.botActivated) {
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

                case 'update':
                    if (!userData.argument2) {
                        this.parseMessage('invalid', userData.displayName);
                    } else {
                        this.enqueue(userData);
                    }
                    break;

                default:
                    if (!userData.argument1) {
                        this.parseMessage('default', userData.displayName);
                    } else {
                        this.parseMessage('invalid', userData.displayName);
                    }
                    break;
            }
        }
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
                    `/me ~> The Windfish has joined the channel, ${argument} must type "${
                        this.approvedCommands[0]
                    } activate" to activate it.`
                );
                break;

            case 'offline':
                this.sendMessage(
                    `/me ~> The Windfish is leaving the channel. WHRRRRRRLLL`
                );
                break;

            case 'activate':
                this.sendMessage(
                    `/me ~> The Windfish and "${
                        this.approvedCommands[0]
                    }" command is now active!`
                );
                break;

            case 'deactivate':
                this.sendMessage(`/me ~> The Windfish has been deactivated.`);
                break;

            case 'inactive':
                this.sendMessage(
                    `/me ~> The Windfish is inactive, ${argument} must type "${
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

module.exports = TwitchBot;
