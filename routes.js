require('dotenv').config();

const { createSessionID } = require('./utils');
const jwt = require('jwt-decode');
const path = require('path');
const fetch = require('node-fetch');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors({ credentials: true, origin: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/beta/auth/twitch', (req, res) => {
    res.redirect(
        `https://id.twitch.tv/oauth2/authorize` +
            `?client_id=${process.env.TWITCH_AUTH_CLIENT_ID}` +
            `&redirect_uri=http://localhost:3000/beta/tracker/` +
            `&response_type=code` +
            `&scope=openid` +
            `&force_verify=true` +
            `&nonce=${createSessionID()}` +
            `&state=${createSessionID()}`
    );
});

app.post('/beta/auth/twitch/validate', (req, res) => {
    let headers = {};
    let requested = {
        valid: false,
        code: req.body.code,
    };

    if (requested.code) {
        requested.valid = true;

        fetch(
            `https://id.twitch.tv/oauth2/token` +
                `?client_id=${process.env.TWITCH_AUTH_CLIENT_ID}` +
                `&client_secret=${process.env.TWITCH_AUTH_CLIENT_SECRET}` +
                `&code=${requested.code}` +
                `&grant_type=authorization_code` +
                `&redirect_uri=http://localhost:3000/beta/tracker/`,
            {
                method: 'POST',
            }
        )
            .then(response => {
                return response.json();
            })
            .then(response => {
                const jwt = jwt(response['id_token']);
                let authenticated = true;

                for (let key in jwt) {
                    const value = jwt[key];

                    switch (key) {
                        case 'aud':
                            if (value !== process.env.TWITCH_AUTH_CLIENT_ID) {
                                console.log('Failed: aud');
                                authenticated = false;
                            }
                            break;

                        case 'azp':
                            if (value !== process.env.TWITCH_AUTH_CLIENT_ID) {
                                console.log('Failed: azp');
                                authenticated = false;
                            }
                            break;

                        case 'iss':
                            if (value !== process.env.TWITCH_AUTH_ISSUER) {
                                console.log('Failed: iss');
                                authenticated = false;
                            }
                            break;

                        case 'nonce':
                            if (value !== response.nonce) {
                                console.log('Failed: nonce');
                                authenticated = false;
                            }
                            break;
                    }
                }

                if (authenticated && response.jwt) {
                    res.end(
                        JSON.stringify({
                            username: response.jwt.preferred_username,
                        })
                    );
                }
            })
            .catch(error => {
                console.log(error);
            });
    } else {
        res.end(JSON.stringify(requested));
    }
});

module.exports = app;
