Vue.config.devtools = true;
Vue.config.productionTip = false;

import 'dotenv';

import Vue from 'vue';
import VueSocketio from 'vue-socket.io';
import App from './App';
import store from './store';
import plugins from './plugins';

import { notice, generateStateItemUpdateData } from './utils';

Vue.use(VueSocketio, process.env.SOCKET_SERVER_PATH);

/* eslint-disable no-new */
new Vue({
    sockets: {
        connect: function() {
            this.$store.dispatch('update socket connection', true);
        },
        disconnect: function() {
            this.$store.dispatch('update socket connection', false);
        },
        'update whitelist add': function(user) {
            let whitelist = this.$botWhitelist.add(user);

            this.$socket.emit('update bot whitelist', whitelist);
        },
        'update whitelist remove': function(user) {
            let whitelist = this.$botWhitelist.remove(user);

            this.$socket.emit('update bot whitelist', whitelist);
        },
        'update broadcast data': function(newItemData) {
            this.$store.dispatch('update broadcast data', newItemData);
        },
        'update tracker data': function(userData) {
            let self = this;
            let dataToUpdate = generateStateItemUpdateData(
                self.$store.getters.items,
                userData.argument2
            );

            if (dataToUpdate.index !== null && dataToUpdate.item !== null) {
                userData.resolved = true;
                self.$store
                    .dispatch('update item data', dataToUpdate)
                    .then(() => {
                        self.$socket.emit('bot dequeue', userData);

                        self.$socket.emit(
                            'send broadcast data',
                            self.$store.getters.items
                        );
                    })
                    .catch(error => {
                        console.log('Promise failed: ' + error);
                    });
            } else {
                userData.resolved = false;
                self.$socket.emit('bot dequeue', userData);
            }
        },
    },
    store,
    ...App,
    mounted() {
        // versionNotice();
        let previousSettings = JSON.parse(
            window.localStorage.getItem('windfishUserSettings')
        );
        Object.assign(this.$store.state.settings, previousSettings);
    },
}).$mount('#app');

// function versionNotice() {
//     notice(
//         '<h5>New in v3.1.4</h5>' +
//             '<ol>' +
//             '<li>Fixed the bomb marker on the map. It will now show the asset.</li>' +
//             '<li>Fixed a bug where trying to connect to Twitch would reload the page, effectively nullifying the connection.</li>' +
//             '</ol>' +
//             '<div class="hide-warning-msg">WHHRRRRRRRRRLLLLLL!</div>',
//         'list'
//     );
// }