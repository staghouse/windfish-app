<template lang="pug">
#app
    MenuBar(v-on:toggleSettings='showSettingsMenu = !showSettingsMenu')
    Trackers
    
    no-ssr
        TwitchAuth(v-on:gotAuthedUser='authedUser = $event')
    no-ssr
        Settings(v-bind='{showSettingsMenu, authedUser}')
    Analytics
</template>

<script>
import TwitchAuth from '~/components/Tracker/TwitchAuth';
import MenuBar from '~/components/Tracker/MenuBar';
import Settings from '~/components/Tracker/Settings';
import Trackers from '~/components/Tracker/Trackers';
import Analytics from '~/components/Shared/Analytics';

export default {
    name: 'App',
    components: {
        TwitchAuth,
        MenuBar,
        Settings,
        Trackers,
        Analytics,
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
    padding: 70px 10px;
}
</style>
