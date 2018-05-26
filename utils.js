const colors = require('colors');

// set theme
colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red',
});

console.log(
    `
██╗    ██╗ ██╗ ███╗   ██╗ ████████╗            ████████╗
██║    ██║ ██║ ████╗  ██║ ██╔════██╗         ██        ██╗
██║ █╗ ██║ ██║ ██╔██╗ ██║ ██║    ██║       ██          ██║
██║███╗██║ ██║ ██║╚██╗██║ ██║    ██║       ██    ██╗   ██║
╚███╔███╔╝ ██║ ██║ ╚████║ ████████╔╝     ██      ╚═╝   ██║
 ╚══╝╚══╝  ╚═╝ ╚═╝  ╚═══╝ ╚═══════╝      ██   ██╗      ██║
                                       ██     ╚═╝      ██║
          Node Server v0.0.1           ██    ██╗       ██║
                                       ██    ╚═╝     ██╔═╝
█████████╗ ██╗ █████████╗ ██╗    ██╗   ██  ██╗       ██║
██╔══════╝ ██║ ██╔══════╝ ██║    ██║   ██  ╚═╝     ██╔═╝
██████╗    ██║ █████████╗ █████████║   ██        ██╔═╝
██╔═══╝    ██║ ╚══════██║ ██╔════██║    ╚████████████╗
██║        ██║ █████████║ ██║    ██║     ╚═══════██████╗
╚═╝        ╚═╝ ╚════════╝ ╚═╝    ╚═╝             ╚═════╝
`.info
);

/***********************************************************
 *
 *  createSessionID
 *
 *  Generate a unique session ID for WebSocket sessioning
 *
 ***********************************************************/
const createSessionID = () => {
    var text = '';
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 100; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

module.exports = {
    colors: colors,
    createSessionID: createSessionID,
};
