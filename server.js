require('dotenv').config();

const { Nuxt, Builder } = require('nuxt');
const { colors } = require('./utils');
const bot = require('./assets/js/twitch-bot');
const app = require('./routes');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

// We instantiate Nuxt.js with the options
let config = require('./nuxt.config.js');
config.dev = !isProd;

const nuxt = new Nuxt(config);

// Start build process in dev mode
if (config.dev) {
    const builder = new Builder(nuxt);
    builder.build();
}
app.use(nuxt.render);

// Listen the server
server.listen(port, process.env.HOST);
console.log(`The Windfish is dreaming on *:${port}\n\n`.warn);

let sessions = {};
// Socket.io
io.on('connection', socket => {
    let connectedCount = Object.keys(socket.client.server.sockets.connected)
        .length;

    console.log(`User connected with ID: ${socket.id}`.info);
    console.log(`Currently connected users: ${connectedCount}`.info);

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
                        currentSocket.server.sockets.connected[userSocketId];

                    socket.emit('update broadcast data', data);
                });
            }
        }
    });

    socket.on('connection broadcast', sessionId => {
        console.log(`User connected with session ID: ${sessionId}`.warn);

        sessions[sessionId] = sessions[sessionId] || {};
        sessions[sessionId].users = sessions[sessionId].users || [];
        sessions[sessionId].users.push(socket.id);

        console.log(sessions);
    });

    socket.on('connection bot', config => {
        let channels = [];

        let twitchConnection = new bot(config);

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

        socket.on('bot dequeue', userData => {
            twitchConnection.dequeue(userData);
        });
    });
});
