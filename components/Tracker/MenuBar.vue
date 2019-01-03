<template lang="pug">

.menu-bar.menu-toggle
    .toggle(
        @click='saveSessionData'
        class="save-data"
        title="Save current session as file")
            img#save-data(
            src='~/static/images/display/icon-save.svg')
        
    .toggle
        a(href="https://github.com/ericlakatos/windfish-app/blob/master/DOCS.md",
        target="_blank"
        title="See Documentation")
            img#help-toggle(
            src='~/static/images/display/icon-help.svg')

    .toggle
        a(href="https://github.com/ericlakatos/windfish-app/issues",
        target="_blank"
        title="Report a Problem")
            img#help-toggle(
            src='~/static/images/display/icon-issues.svg')

    .toggle(
        @click='$emit("toggleSettings")'
        title="Show Settings")
            img#settings-toggle(
            src='~/static/images/display/icon-settings.svg')

</template>

<script>
import { notice } from '~/assets/js/utils';
export default {
    name: 'MenuBar',
    methods: {
        saveSessionData(){
            /**
             * take current state, sabe it as JSON file on local machine
             * Later, allow to be uploaded to replace state
             */
            const currentState = this.$store.getters.state;
            /** Delete the state that we need to figure out from the get go
             * For example, if we say we "are" on a socket, that might
             * mess with the data that we have already saved
             */
            delete currentState.socket;
            delete currentState.socketAvailable;
            delete currentState.socketConnected;

            //

        }
    }
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/vars';

.menu-bar {
    margin: 0 auto;
    text-align: right;
    padding: 10px 20px;
    box-sizing: border-box;
    background-color: $blue-1;
    border-bottom: 1px solid $blue-2;
    color: white;
    font-size: 16px;
    width: 100%;
    z-index: 500;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: auto;
    display: flex;
    justify-content: flex-end;

    .toggle {
        flex: none;
        height: 100%;
        margin-right: 20px;

        img {
            cursor: pointer;
            width: auto;
            height: 100%;
        }

        &:last-of-type {
            margin-right: 0;
        }
    }
}
</style>
