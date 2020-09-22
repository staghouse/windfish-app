<template lang="pug">
#app
    MenuBar(v-on:toggleSettings='showSettingsMenu = !showSettingsMenu')
    Trackers
    #823117887
    //- no-ssr
    //-     TwitchAuth(v-on:gotAuthedUser='authedUser = $event')
    no-ssr
        Settings(v-bind='{showSettingsMenu, authedUser}')
</template>

<script>
import TwitchAuth from '~/components/Tracker/TwitchAuth';
import MenuBar from '~/components/Tracker/MenuBar';
import Settings from '~/components/Tracker/Settings';
import Trackers from '~/components/Tracker/Trackers';
import { storeUserDataInLocalStorage } from '@/assets/js/utils';

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
    mounted(){
        try {
            window._mNHandle.queue.push(function (){
                window._mNDetails.loadTag("823117887", "728x90", "823117887");
            });
        }
        catch (error) {}
    }
};
</script>

<style lang="scss">
@import '../../assets/styles/main.scss';

#app {
    padding: 70px 10px 0;
}
</style>
