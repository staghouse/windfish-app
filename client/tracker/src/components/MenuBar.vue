<template lang="pug">

.menu-bar.menu-toggle
    .help-toggle.item(
    @click='displayHelp')

        img#help-toggle(
        src='../../static/images/display/icon-help.svg')

    .settings-toggle.item(
    @click='$emit("toggleSettings")')
    
        img#settings-toggle(
        src='../../static/images/display/icon-settings.svg')

</template>

<script>
import { warn } from '../utils';
export default {
    name: 'MenuBar',
    methods: {
        displayHelp() {
            warn(
                '<h5>How to use the trackers</h5>' +
                    '<h6>Overworld</h6>' +
                    '<ol>' +
                    '<li>Left click (primary) toggles a `cleared` marker that covers the location but keeps all previous markers.</li>' +
                    '<li>Right click (context) activates a menu to apply markers to any location.</li>' +
                    '<li>Clicking the same marker twice in the menu will remove it from the location.</li>' +
                    '<li>Alphanumeric markers will highlight similar markers on hover.</li>' +
                    '</ol>' +
                    '<h6>Items</h6>' +
                    '<ol>' +
                    '<li>Left click (primary) toggles the activate state or progresses the current state.</li>' +
                    '</ol>' +
                    '<h6>Timer</h6>' +
                    '<ol>' +
                    '<li>Left click (primary) toggles the start and stop of the time.</li>' +
                    '<li>After stopping the time you can save that current time for tracking against on refresh.</li>' +
                    '</ol>' +
                    '<div class="hide-warning-msg">WHHRRRRRRRRRLLLLLL!</div>',
                'list'
            );
        },
    },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/vars';

.menu-bar {
    margin: 0 auto;
    text-align: right;
    padding: 10px;
    height: 45px;
    box-sizing: border-box;
    background-color: $blue-1;
    border-bottom: 1px solid $blue-2;
    color: white;
    font-size: 16px;
    width: 100%;
    position: relative;
    z-index: 500;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: auto;

    .item {
        height: 100%;

        img {
            cursor: pointer;
            width: auto;
            height: 100%;
        }

        &:first-of-type {
            float: left;
            margin-left: 20px;
        }

        &:last-of-type {
            float: right;
            margin-right: 20px;
        }
    }
}
</style>
