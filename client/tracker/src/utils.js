import crypto from 'crypto';

/********************************************************
 *
 *  authGetUser
 *
 *  @param {String} uri - Server path to validate token
 *  @param {String} token - OAUTH returned token
 *
 ********************************************************/
export async function authGetUser(uri, token) {
    let response = {
        username: null,
        authenticated: false,
    };

    let newResponse = await fetch(uri + '/twitch-user', {
        method: 'post',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
    })
        .then(res => {
            return res.json();
        })
        .then(res => {
            if (res.data.length > 0) {
                response.username = res.data[0].login;
                response.authenticated = true;
            }

            return response;
        })
        .catch(error => {
            console.log(error);
        });

    return newResponse;
}

/****************************************************************
 *
 *  generateStateItemUpdateData
 *
 *  @param {Object} itemStore - Stateful item object from Vuex
 *  @param {String} command - String data sent from Twitch chat
 *
 ****************************************************************/
export function generateStateItemUpdateData(itemStore, command) {
    let item = null;
    let index = null;

    itemStore.forEach((currentItem, itemIndex) => {
        if (
            currentItem.id === command ||
            currentItem.commands.includes(command)
        ) {
            index = itemIndex;

            item = Object.assign({}, currentItem);
        }
    });

    if (item && index) {
        // Update the list position or counter if applicable
        let itemHasCounter = Number.isInteger(item.counter);

        if (itemHasCounter) {
            if (item.category === 'chest') {
                item.currentCounter =
                    item.currentCounter === 0
                        ? item.counter
                        : item.currentCounter - 1;
            } else {
                item.currentCounter =
                    item.currentCounter < item.counter
                        ? item.currentCounter + 1
                        : 0;
            }

            // If the count can still go, keep the active state,
            // otherwise make it look inactive;
            item.listPosition = item.currentCounter > 0 ? 1 : 0;
        } else {
            item.listPosition =
                item.list.length === item.listPosition
                    ? 0
                    : item.listPosition + 1;
        }
    }

    return {
        item: item,
        index: index,
    };
}

/****************************************************************************
 *
 *  hasRequirements
 *
 *  @param {Object} itemStore - Stateful item object from Vuex
 *  @param {Object} requirements - Non-stateful object of data to reference
 *
 ****************************************************************************/
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

/**************************************************************************
 *
 *  notice
 *
 *  @param {String} str - String to apply in DOM markup
 *  @param {String} customClass - Custom CSS class to apply to DOM markup
 *
 **************************************************************************/
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

/***********************************************************
 *
 *  createHash
 *
 *  Generate a SHA256 unique seed for WebSocket sessioning
 *
 ***********************************************************/
export function createHash() {
    const salt = `${new Date()}${new Date().getMilliseconds()}`;
    const hash = crypto
        .createHmac('sha256', salt)
        .update(salt)
        .digest('hex');

    return hash;
}
