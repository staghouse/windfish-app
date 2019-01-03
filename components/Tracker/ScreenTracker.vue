<template lang="pug">

.screen-tracker.tracker(
    ref="screenTracker")


    .screens
        ContextMenu(
        v-if="showContextMenu",
        v-on:closeContextMenu="showContextMenu = false"
        v-bind='{ contextMenuPosition }')

        ScreenGrid(
        v-on:showContextMenu='toggleContextMenu($event)')

</template>

<script>
import ContextMenu from '~/components/Tracker/ContextMenu';
import ScreenGrid from '~/components/Tracker/ScreenGrid';
export default {
    components: {
        ContextMenu,
        ScreenGrid,
    },
    data() {
        return {
            showContextMenu: false,
            contextMenuPosition: {
                x: 0,
                y: 0,
            },
        };
    },
    methods: {
        toggleContextMenu(event) {
            this.showContextMenu = true;

            let width = document.documentElement.clientWidth;
            let height = document.documentElement.clientHeight;

            let xGoldilocks = width - event.clientX;
            let yGoldilocks = height - event.clientY;

            let wOffset = 0;
            let hOffset = 70;

            let x =
                event.clientX > xGoldilocks
                    ? event.clientX - 320
                    : event.clientX;

            let y =
                event.clientY > yGoldilocks - hOffset * 2
                    ? 0
                    : event.clientY - hOffset;

            if (width > this.$refs.screenTracker.offsetWidth) {
                wOffset = (width - this.$refs.screenTracker.offsetWidth) / 2;
            }

            this.contextMenuPosition.x = `${x - wOffset}px`;
            this.contextMenuPosition.y = `${y}px`;

            this.$store.dispatch('update screen context', event.currentTarget);
        },
    },
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/mixins';
@import '../../assets/styles/images';

.screen-tracker {
    position: relative;
    padding: 10px;
    z-index: 300;

    .screens {
        position: relative;
    }
}
</style>
