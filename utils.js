const crypto = require('crypto');
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

createHash = () => {
    const salt = `${new Date()}${new Date().getMilliseconds()}`;
    const hash = crypto
        .createHmac('sha256', salt)
        .update(salt)
        .digest('hex');

    return hash;
};

module.exports = {
    colors: colors,
    createHash: createHash,
};
