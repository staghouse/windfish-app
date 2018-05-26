<template lang="pug">
#app
    MenuBar(v-on:toggleSettings='showSettingsMenu = !showSettingsMenu')
    Trackers
    
    no-ssr
        TwitchAuth(v-on:gotAuthedUser='authedUser = $event')
    no-ssr
        Settings(v-bind='{showSettingsMenu, authedUser}')
</template>

<script>
import TwitchAuth from './TwitchAuth';
import MenuBar from './MenuBar';
import Settings from './Settings';
import Trackers from './Trackers';

export default {
    name: 'App',
    components: {
        TwitchAuth,
        MenuBar,
        Settings,
        Trackers,
    },
    data() {
        return {
            showSettingsMenu: false,
            authedUser: null,
        };
    },
};
</script>

<style lang="scss">
@import '../../assets/styles/main.scss';

#app {
    padding: 70px 0;
}
</style>
