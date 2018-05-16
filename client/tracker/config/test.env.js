'use strict';
const merge = require('webpack-merge');
const devEnv = require('./dev.env');

module.exports = merge(devEnv, {
    NODE_ENV: '"testing"',
    SOCKET_SERVER_PATH: '"localhost:3000"',
});
