<template lang="pug">
#app
    MenuBar(v-on:toggleSettings='showSettingsMenu = !showSettingsMenu')
    Settings(v-bind='{showSettingsMenu}')
    Trackers
</template>

<script>
import MenuBar from './components/MenuBar';
import Settings from './components/Settings';
import Trackers from './components/Trackers';

export default {
    name: 'App',
    components: {
        MenuBar,
        Settings,
        Trackers,
    },
    data() {
        return {
            showSettingsMenu: false,
        };
    },
};
</script>

<style lang="scss">
@import './assets/styles/main.scss';

#app {
    padding: 70px 0;
}
</style>
