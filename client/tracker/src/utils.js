import crypto from 'crypto';

// +--------------------------------------------------------------------+
// |                                                                    |
// |  Compare requirements for dungeons against current tracked status  |
// |                                                                    |
// +--------------------------------------------------------------------+
export function hasRequirements(itemStore, requirements) {
    let met = false;

    if (!requirements) return true;

    if (requirements && !met) {
        let allMet = false;
        let anyMet = false;
        let count = 0;
        let types = Object.keys(requirements[0]);

        for (let index = 0; index < types.length; index++) {
            let type = types[index];
            let list = requirements[0][type];

            if (!list) {
                if (type === 'all') allMet = true;
                if (type === 'any') anyMet = true;
            } else {
                let count = 0;

                itemStore.forEach(item => {
                    if (list.includes(item.id) && item.listPosition > 0) {
                        count++;
                    }
                });

                if (count > 0) {
                    if (type === 'all' && count === list.length) {
                        allMet = true;
                        // console.log('All requirements met for ' + type);
                    }
                    if (type === 'any') {
                        anyMet = true;
                        // console.log('All requirements met for ' + type);
                    }
                }
            }
        }

        if (allMet && anyMet) met = true;

        return met;
    }
}

// +---------------------+
// |                     |
// |  Bulletproof modal  |
// |                     |
// +---------------------+
export function notice(str, customClass) {
    var className = customClass || '';
    document.body.insertAdjacentHTML(
        'beforeend',
        '<div id="warning-overlay"><div class="warn-box ' +
            className +
            '">' +
            str +
            '</div></div>'
    );

    var msg = document.getElementById('warning-overlay');
    msg.addEventListener('click', function() {
        msg.parentNode.removeChild(msg);
    });
}

// +----------------------------------------------------+
// |                                                    |
// |  Create a unique session ID for the client socket  |
// |                                                    |
// +----------------------------------------------------+
export function createHash(seed) {
    const salt = `${new Date()}${new Date().getMilliseconds()}`;
    const hash = crypto
        .createHmac('sha256', seed || salt)
        .update(salt)
        .digest('hex');

    return hash;
}
