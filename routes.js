const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, 'client/tracker/dist')));

// Prod redirects
app.get('/', function(req, res) {
    res.redirect(302, 'https://ericlakatos.github.com/windfish');
});

app.get('/windfish', function(req, res) {
    res.redirect(302, 'https://ericlakatos.github.com/windfish/windfish');
});

// Prod Beta client pages
app.get('/beta', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/docs/dist/index.html'));
});

app.get('/beta/windfish', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/tracker/dist/tracker.html'));
});

module.exports = app;
