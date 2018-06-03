<template lang="pug">

.trackers(
v-bind:style="{backgroundColor: $store.getters.settings.trackers.backgroundColor.value}",
v-bind:data-border="$store.getters.settings.trackers.showBorder.value",
v-bind:data-border-silver="$store.getters.settings.trackers.borderImageSilver.value",
v-bind:data-border-gold="$store.getters.settings.trackers.borderImageGold.value",
v-bind:data-layout-stream="$store.getters.settings.trackers.layoutStream.value",
v-bind:data-layout-stacked="$store.getters.settings.trackers.layoutStacked.value",
v-bind:data-layout-reverse="$store.getters.settings.trackers.layoutReverse.value",
v-bind:data-layout-map="$store.getters.settings.trackers.layoutMap.value",
v-bind:data-layout-items="$store.getters.settings.trackers.layoutItems.value")
    no-ssr
        TimeTracker(
        v-if="$store.getters.settings.trackers.timerVisible.value")

    .layout-wrap
        ScreenTracker
        ItemTracker

</template>

<script>
import TimeTracker from '~/components/Tracker/TimeTracker';
import ScreenTracker from '~/components/Tracker/ScreenTracker';
import ItemTracker from '~/components/Tracker/ItemTracker';

export default {
    name: 'Trackers',
    components: {
        TimeTracker,
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
    background-color: $blue-1;

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

    &[data-layout-stacked='true'] {
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

    &[data-layout-stream='true'] {
        max-width: $tracker-max-width + 200px;
        min-width: $tracker-max-width;

        .layout-wrap {
            display: grid;
            grid-template-columns: repeat(18, 1fr);
            grid-template-rows: auto;

            .screen-tracker {
                grid-column-start: span 12;
            }

            .item-tracker {
                grid-column-start: span 6;
                border-top-width: 11px;
                border-left-width: 0;
                grid-template-columns: repeat(8, 1fr);
                grid-row-gap: 5px;

                .item {
                    .item__wrap {
                        background-size: contain;
                        padding-bottom: 0;

                        &-text {
                            font-size: 1.2rem;

                            @include mediaMax(400px) {
                                font-size: 0.8rem;
                            }
                        }
                    }

                    &[data-id='dungeon1-chests'],
                    &[data-id='dungeon2-chests'],
                    &[data-id='dungeon3-chests'],
                    &[data-id='dungeon4-chests'] {
                        grid-row-start: 6;

                        &[data-even-more-items='true'],
                        &[data-more-items='true'] {
                            grid-row-start: 8;
                        }

                        &[data-more-items='true'][data-even-more-items='true'] {
                            grid-row-start: 10;
                        }
                    }
                }
            }
        }
    }
}
</style>
