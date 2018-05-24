Vue.config.devtools = true;
Vue.config.productionTip = true;

import 'dotenv';

import Vue from 'vue';
import VueSocketio from 'vue-socket.io';
import App from './components/App';
import store from './store';
import sockets from './sockets';
import plugins from './plugins';

Vue.use(VueSocketio, process.env.SOCKET_SERVER_PATH);

new Vue({
    store,
    sockets,
    ...App,
    mounted() {
        let previousSettings = JSON.parse(
            window.localStorage.getItem('windfishUserSettings')
        );
        Object.assign(this.$store.state.settings, previousSettings);
    },
}).$mount('#app');
