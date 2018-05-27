<template lang="pug">

.trackers(
v-bind:style="{backgroundColor: $store.getters.settings.trackers.backgroundColor.value}",
v-bind:data-border="$store.getters.settings.trackers.showBorder.value",
v-bind:data-border-silver="$store.getters.settings.trackers.borderImageSilver.value",
v-bind:data-border-gold="$store.getters.settings.trackers.borderImageGold.value",
v-bind:data-layout-hybrid="$store.getters.settings.trackers.layoutHybrid.value",
v-bind:data-layout-reverse="$store.getters.settings.trackers.layoutReverse.value",
v-bind:data-layout-map="$store.getters.settings.trackers.layoutMap.value",
v-bind:data-layout-items="$store.getters.settings.trackers.layoutItems.value")
    no-ssr
        TimerTracker(
        v-if="$store.getters.settings.trackers.timerVisible.value")

    .layout-wrap
        ScreenTracker
        ItemTracker

</template>

<script>
import TimerTracker from '~/components/Tracker/TimerTracker';
import ScreenTracker from '~/components/Tracker/ScreenTracker';
import ItemTracker from '~/components/Tracker/ItemTracker';

export default {
    name: 'App',
    components: {
        TimerTracker,
        ScreenTracker,
        ItemTracker,
    },
};
</script>

<style lang="scss">
@import '../../assets/styles/vars';
@import '../../assets/styles/images';
@import '../../assets/styles/mixins';

.trackers {
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    position: relative;
    max-width: $tracker-max-width;
    // re-set by settings
    background-color: $blue-1;

    @include clearfix;

    .layout-wrap {
        display: flex;
        flex-wrap: wrap;

        & * {
            flex: 100%;
        }
    }

    .tracker {
        box-sizing: border-box;
        border-color: transparent;
        border-image-source: none;
        border-width: 11px;
        border-style: solid;
        border-image-slice: 11;
        border-image-repeat: round;
    }

    &[data-border='true'] {
        &[data-border-silver='true'] {
            .tracker {
                border-image-source: url($image-border);
            }
        }

        &[data-border-gold='true'] {
            .tracker {
                border-image-source: url($image-border-gold);
            }
        }
    }

    &[data-layout-hybrid='true'] {
        .item-tracker {
            border-top-width: 0;
        }
    }

    &[data-layout-reverse='true'] {
        .layout-wrap {
            flex-direction: column-reverse;

            .screen-tracker {
                border-top-width: 0;
            }
        }
    }

    &[data-layout-items='true'] {
        .screen-tracker {
            display: none;
        }
    }

    &[data-layout-map='true'] {
        .item-tracker {
            display: none;
        }
    }
}
</style>
