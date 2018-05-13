// const { createHash } = require('./socket-utils');
require('dotenv').config();

const ircParser = require('./irc-parser');
const crypto = require('crypto');
const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT;

let sessions = {};

app.use(express.static(path.join(__dirname, 'client', 'static')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);

    io.on('connection', socket => {
        let connectedClients = Object.keys(
            socket.client.server.sockets.connected
        );
        let connectedCount = connectedClients.length;

        console.info(`User connected with ID: ${socket.id}`);
        console.log(`Currently connected users: ${connectedCount}`);
        console.log('Clients:');
        console.log(connectedClients);

        socket.on('disconnect', () => {
            console.log(`User disconnected with ID: ${socket.id}`);

            for (let key in sessions) {
                let session = sessions[key];
                let position = session.users.indexOf(socket.id);

                if (position > -1) {
                    // Remove the user from the stored session users
                    session.users.splice(position, 1);

                    // If no users attached to the session
                    if (session.users.length < 1) {
                        // remove the session from memory
                        console.log(`Deleting session ID: ${key}`);
                        delete sessions[key];
                    }
                }
            }
        });

        socket.on('connection broadcast', sessionId => {
            let twitchConnection = null;

            console.info(`User connected with session ID: ${sessionId}`);

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

            socket.on('connection bot', channel => {
                let channels = [];
                twitchConnection = new ircParser();

                channels.push(`#${channel}`);

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
            });
        });
    });
});
