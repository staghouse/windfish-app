require('dotenv').config();

const { createSessionID } = require('./utils');
const jwt = require('jwt-decode');
const fetch = require('node-fetch');
const redirectSSL = require('redirect-ssl');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let client_referrer = process.env.TWITCH_AUTH_REFERRER_HOST;
let referrer_scope = process.env.TWITCH_AUTH_REFERRER_SCOPE;
let client_id = process.env.TWITCH_AUTH_CLIENT_ID;
let client_secret = process.env.TWITCH_AUTH_CLIENT_SECRET;

app.use(redirectSSL);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/auth/twitch', (req, res) => {
    res.redirect(
        `https://id.twitch.tv/oauth2/authorize` +
            `?client_id=${client_id}` +
            `&redirect_uri=${client_referrer}${referrer_scope}` +
            `&response_type=code` +
            `&scope=openid` +
            `&force_verify=true` +
            `&nonce=${createSessionID()}` +
            `&state=${createSessionID()}`
    );
});

app.post('/api/auth/twitch/validate', (req, res) => {
    let headers = {};
    let requested = {
        valid: false,
        code: req.body.code,
    };

    if (requested.code) {
        requested.valid = true;

        fetch(
            `https://id.twitch.tv/oauth2/token` +
                `?client_id=${client_id}` +
                `&client_secret=${client_secret}` +
                `&code=${requested.code}` +
                `&grant_type=authorization_code` +
                `&redirect_uri=${client_referrer}${referrer_scope}`,
            {
                method: 'POST',
            }
        )
            .then(response => {
                return response.json();
            })
            .then(response => {
                const jwt_decoded = jwt(response['id_token']);
                let authenticated = true;

                for (let key in jwt_decoded) {
                    const value = jwt_decoded[key];

                    switch (key) {
                        case 'aud':
                        case 'azp':
                            if (value !== client_id) {
                                console.log(`Failed: ${key}`);
                                authenticated = false;
                            }
                            break;

                        case 'iss':
                            if (value !== process.env.TWITCH_AUTH_ISSUER) {
                                console.log(`Failed: ${key}`);
                                authenticated = false;
                            }
                            break;

                        case 'nonce':
                            if (value !== response.nonce) {
                                console.log(`Failed: ${key}`);
                                authenticated = false;
                            }
                            break;
                    }
                }

                if (authenticated && jwt_decoded.preferred_username) {
                    res.end(
                        JSON.stringify({
                            username: jwt_decoded.preferred_username,
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
