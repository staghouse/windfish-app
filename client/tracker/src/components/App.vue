<template lang="pug">
#app
    TwitchAuth(v-on:gotAuthedUser='authedUser = $event')
    MenuBar(v-on:toggleSettings='showSettingsMenu = !showSettingsMenu')
    Settings(v-bind='{showSettingsMenu, authedUser}')
    Trackers
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
@import '../assets/styles/main.scss';

#app {
    padding: 70px 0;
}
</style>
