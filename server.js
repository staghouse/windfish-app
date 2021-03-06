require('dotenv').config();

const { Nuxt, Builder } = require('nuxt');
const bot = require('./assets/js/twitch-bot');
const app = require('./routes');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const isProd = process.env.NODE_ENV === 'production';
const isPrecommit = process.env.PRECOMMIT === 'true';

// We instantiate Nuxt.js with the options
let config = require('./nuxt.config.js');
config.dev = !isProd;

const nuxt = new Nuxt(config);

// Listen the server
server.listen(process.env.PORT, process.env.HOST);
console.log(
    `The Windfish is dreaming on ${process.env.HOST}:${process.env.PORT}\n\n`
        .warn
);

// Start build process in dev mode
if (config.dev && !isPrecommit) {
    const builder = new Builder(nuxt);
    builder.build();
}
app.use(nuxt.render);

let sessions = {};

/**
 * Socket.io
 *
 * Here is where we set up all out socket connections, handlers, events
 * responses and any other behaviour we need to happen during a connection
 */
io.on('connection', socket => {
    let connectedCount = Object.keys(socket.client.server.sockets.connected)
        .length;

    console.log(`User connected with ID: ${socket.id}`.info);
    console.log(`Currently connected users: ${connectedCount}`.info);

    // Make sure we disconnect everything possible for a user, session, etc.
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

    /**
     * Send the complete tracker data between two multiple connections
     */
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

    /**
     * Connect sockets, or rather, bind them to the instance of the WebSocket
     */
    socket.on('connection broadcast', sessionId => {
        console.log(`User connected with session ID: ${sessionId}`.warn);

        sessions[sessionId] = sessions[sessionId] || {};
        sessions[sessionId].users = sessions[sessionId].users || [];
        sessions[sessionId].users.push(socket.id);

        console.log(sessions);
    });

    /**
     * Connect the bot and and initialize all that requires of it
     */
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
            identity: {
                username: process.env.TWITCH_BOT_NAME,
                password: process.env.TWITCH_BOT_TOKEN,
            },
            channels,
            socket,
        });

        // Kill the bot
        socket.on('disconnect bot', () => {
            twitchConnection.disconnect();
        });

        // Update the bot whitelist. More details in the actual bot code
        socket.on('update bot whitelist', whitelist => {
            twitchConnection.updateWhitelist(whitelist);
        });

        /**
         * We dequeue certain bot actions so we can effectively "promise".
         * This inner logic can be refactors based on JS Promises but for
         * now we just dequeue in a classic callback way.
         * IE: Chat activate sword and another chat user activates shield...
         * We just make sure we complete one before the other.
         */
        socket.on('bot dequeue', userData => {
            twitchConnection.dequeue(userData);
        });
    });
});

/**
 * Just kind of a way to check for any issues before we commit to Git.
 */
if (isPrecommit) {
    console.log('No issues found in start mock'.warn);
    process.exit();
}
