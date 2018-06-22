export class BotWhitelist {
    constructor() {
        this.whitelist = [];
        this.response = {
            type: null,
            success: null,
            username: null,
        };

        this.get();
    }

    get() {
        if (window !== undefined) {
            if (window.localStorage) {
                this.whitelist =
                    JSON.parse(
                        window.localStorage.getItem('windfishBotWhitelist')
                    ) || [];
            }

            return this.whitelist;
        } else {
            return {
                message: 'Window is not defined.',
            };
        }
    }

    add(user) {
        if (window !== undefined) {
            let whitelist =
                this.whitelist && typeof whitelist === 'array'
                    ? this.whitelist
                    : [];

            this.whitelist = [...whitelist, user.toLowerCase()];

            if (this.whitelist.length > whitelist.length) {
                this.response.success = true;
            }

            if (window.localStorage) {
                window.localStorage.setItem(
                    'windfishBotWhitelist',
                    JSON.stringify(this.whitelist)
                );
            }

            this.response.type = 'add';
            this.response.username = user;

            return this;
        } else {
            return {
                message: 'Window is not defined.',
            };
        }
    }

    remove(user) {
        this.whitelist =
            this.whitelist && typeof this.whitelist === 'array'
                ? this.whitelist
                : [];

        if (this.whitelist) {
            if (this.whitelist.indexOf(user) > -1) {
                this.whitelist.splice(1, this.whitelist.indexOf(user));
                this.response.success = true;
            }
        }

        this.response.type = 'remove';
        this.response.username = user;

        return this;
    }
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

    if (item) {
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
            // otherwise make it look inactive
            item.listPosition = item.currentCounter > 0 ? 1 : 0;
        } else {
            item.listPosition =
                item.list.length === item.listPosition
                    ? item.permanent
                        ? 1
                        : 0
                    : item.listPosition + 1;
        }
    }

    return {
        item: item,
        index: index,
    };
}

/********************************************************
 *
 *  authGetUser
 *
 *  @param {String} uri - Server path to validate token
 *  @param {String} token - OAUTH returned token
 *
 ********************************************************/
export async function authGetUser(uri, code) {
    let newResponse = await fetch(uri + 'validate', {
        method: 'post',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
    })
        .then(res => {
            return res.json();
        })
        .then(res => {
            return {
                username: res.username,
            };
        })
        .catch(error => {
            console.log(error);
        });

    return newResponse;
}

/****************************************************************************
 *
 *  hasRequirements
 *
 *  @param {Object} itemStore - Stateful item object from Vuex
 *  @param {Object} requirements - Non-stateful object of data to reference
 *
 ****************************************************************************/
export function hasRequirements(itemStore, requirements, id) {
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
                    let itemAvailable = item.listPosition > 0; // Has first item
                    let listIsProgressed = item.listPosition > 1; // Has second item
                    let itemIsProgressed = list.includes(`${item.id}_l2`); // Requires second of this item
                    let listIncludesItem = list.includes(item.id); // Requires first of this item

                    // console.log(
                    //     list,
                    //     item.id,
                    //     itemIsProgressed,
                    //     listIsProgressed
                    // );

                    if (itemAvailable) {
                        if (listIncludesItem) {
                            count++;
                        } else {
                            if (itemIsProgressed && listIsProgressed) {
                                count++;
                            }
                        }
                    }
                });

                if (count > 0) {
                    if (type === 'all' && count === list.length) {
                        allMet = true;
                        // console.log('Requirements met for ' + type);
                    }
                    if (type === 'any') {
                        anyMet = true;
                        // console.log('Requirements met for ' + type);
                    }
                }
            }
        }

        if (allMet && anyMet) met = true;

        return met;
    }
}

/***********************************************************
 *
 *  createSessionID
 *
 *  Generate a unique session ID for WebSocket sessioning
 *
 ***********************************************************/
export function createSessionID() {
    var text = '';
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
