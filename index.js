const crypto = require('crypto');
const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

let sessions = {
    current: [],
};

app.use(express.static(path.join(__dirname, 'client', 'static')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);

    io.on('connection', socket => {
        // console.log('a user connected');
        io.emit('connection status', 'Connected!');

        socket.on('disconnect', () => {
            let session = sessions.current[socket.sessionID];
            let sessionUsers = sessions.current[socket.sessionID].users;
            let position = sessionsUsers.indexOf(socket.id);

            // Remove the user from the stored session users
            if (position !== -1) sessionsUsers.splice(position, 1);

            // If that was the last user remove the session
            // We should _probably_ preserve this for a limited time
            // but not right now
            if (sessionsUsers.length < 1) {
                console.log(`Deleting session ID: ${socket.sessionID}`);
                delete session;
            }
        });

        socket.on('generate seed', function(seed) {
            const salt = `${new Date()}`;
            const hash = crypto
                .createHmac('sha256', seed)
                .update(salt)
                .digest('hex');

            // Store the hash as a session
            socket.sessionID = hash;
            sessions.current[hash] = sessions.current[hash] || {};
            sessions.current[hash].users = sessions.current[hash].users || [];
            sessions.current[hash].users.push(socket.id);

            io.emit('generate seed', hash);
        });
    });
});
