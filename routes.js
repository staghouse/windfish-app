require('dotenv').config();

const path = require('path');
const fetch = require('node-fetch');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors({ credentials: true, origin: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client/tracker/dist')));

// Prod redirects
app.get('/', function(req, res) {
    res.redirect(302, 'https://ericlakatos.github.io/windfish');
});

app.get('/windfish', function(req, res) {
    res.redirect(302, 'https://ericlakatos.github.io/windfish/windfish');
});

// Prod Beta client pages
app.get('/beta', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/docs/dist/index.html'));
});

app.get('/beta/windfish', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/tracker/dist/tracker.html'));
});

app.get('/beta/auth', (req, res) => {
    res.redirect(
        302,
        `https://id.twitch.tv/oauth2/authorize?client_id=${
            process.env.TWITCH_AUTH_CLIENT_ID
        }&redirect_uri=http://localhost:8080/beta/windfish&response_type=token+id_token&scope=openid&force_verify=true`
    );
});

app.post('/beta/auth/twitch-user', (req, res) => {
    let response = {
        token: req.body.token,
    };

    headers = {};

    if (response.token) {
        headers['Authorization'] = `Bearer ${response.token}`;
    } else {
        headers['Client-ID'] = process.env.TWITCH_AUTH_CLIENT_ID;
    }

    fetch(`https://api.twitch.tv/helix/users`, {
        headers: headers,
    })
        .then(r => {
            return r.json();
        })
        .then(r => {
            res.end(JSON.stringify(r));
        })
        .catch(error => {
            console.log(error);
        });
});

module.exports = app;
