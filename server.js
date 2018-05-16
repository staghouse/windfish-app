require('dotenv').config();

const { colors } = require('./utils');
const bot = require('./class/bot');
const app = require('./routes');
const http = require('http').Server(app);
const io = require('socket.io')(http);

http.listen(process.env.PORT, () => {
    console.log(`The Wind Fish is dreaming on *:${process.env.PORT}\n\n`.warn);

    let sessions = {};

    io.on('connection', socket => {
        let connectedClients = Object.keys(
            socket.client.server.sockets.connected
        );
        let connectedCount = connectedClients.length;

        console.log(`User connected with ID: ${socket.id}`.info);
        console.log(`Currently connected users: ${connectedCount}`.info);
        console.log('Clients:');
        console.log(connectedClients);

        socket.on('disconnect', () => {
            console.log(`User disconnected with ID: ${socket.id}`.warn);

            for (let key in sessions) {
                let session = sessions[key];
                let position = session.users.indexOf(socket.id);

                if (position > -1) {
                    // Remove the user from the stored session users
                    session.users.splice(position, 1);

                    // If no users attached to the session
                    if (session.users.length < 1) {
                        // remove the session from memory
                        console.log(`Deleting session ID: ${key}`.warn);
                        delete sessions[key];
                    }
                }
            }
        });

        socket.on('connection broadcast', sessionId => {
            let twitchConnection = null;

            console.log(`User connected with session ID: ${sessionId}`.warn);

            sessions[sessionId] = sessions[sessionId] || {};
            sessions[sessionId].users = sessions[sessionId].users || [];
            sessions[sessionId].users.push(socket.id);

            console.log(sessions);

            socket.on('send broadcast data', data => {
                let currentSocket = socket;
                let connectedSocketIds = Object.keys(
                    currentSocket.server.sockets.connected
                );

                for (let key in sessions) {
                    let session = sessions[key];
                    let position = session.users.indexOf(socket.id);

                    if (position > -1) {
                        session.users.forEach(userSocketId => {
                            let socket =
                                currentSocket.server.sockets.connected[
                                    userSocketId
                                ];

                            socket.emit('update broadcast data', data);
                        });
                    }
                }
            });

            socket.on('connection bot', config => {
                let channels = [];

                twitchConnection = new bot(config);

                channels.push(`#${config.channel}`);

                twitchConnection.connect({
                    options: {
                        debug: true,
                    },
                    connection: {
                        reconnect: true,
                    },
                    channels: channels,
                    identity: {
                        username: process.env.TWITCH_BOT_NAME,
                        password: process.env.TWITCH_BOT_TOKEN,
                    },
                    socket: socket,
                });

                socket.on('disconnect bot', () => {
                    twitchConnection.disconnect();
                });

                socket.on('update bot whitelist', whitelist => {
                    twitchConnection.updateWhitelist(whitelist);
                });
            });
        });
    });
});
