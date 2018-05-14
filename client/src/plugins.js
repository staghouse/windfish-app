import Vue from 'vue';

class BotWhitelist {
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
        this.whitelist =
            JSON.parse(window.localStorage.getItem('windfishBotWhitelist')) ||
            [];

        return this.whitelist;
    }

    add(user) {
        let whitelist =
            this.whitelist && typeof whitelist === 'array'
                ? this.whitelist
                : [];

        whitelist.push(user);

        if (whitelist.length > this.whitelist.length) {
            this.response.success = true;
        }

        window.localStorage.setItem(
            'windfishBotWhitelist',
            JSON.stringify(whitelist)
        );

        this.whitelist = whitelist;

        this.response.type = 'add';
        this.response.username = user;

        return this;
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

const Plugins = {
    install(Vue) {
        Vue.prototype.$botWhitelist = new BotWhitelist();
    },
};

Vue.use(Plugins);
