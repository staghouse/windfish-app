<template lang="pug">

.context-menu(
    v-bind:style="{left: contextMenuPosition.x, top: contextMenuPosition.y}")
    .close(
    @click='$emit("closeContextMenu")') x

    .context-menu-wrap
        .marker-reset-btn(
        @click="resetMarkers") Reset Markers

        ol.context-categories
            .marker-category(
            v-for='(list, index) in markers',
            v-bind:key='index'
            v-bind:data-id='list.id',
            v-bind:data-compact='$store.getters.settings.screens.compactMarkers.value')

                ol.marker-context-list(
                v-bind:data-extra='list.isExtra')

                    li.heading {{list.heading}}

                    li.menu-item(
                    @click='selectMarker',
                    v-for='(marker, i) in list.contents',
                    v-bind:key='i',
                    v-bind:data-id='marker.id',
                    v-bind:data-type='list.id',
                    v-bind:title='marker.title') {{marker.id}}

</template>

<script>
import markerDataList from '../data/markers';
export default {
    name: 'ScreenMenu',
    props: ['contextMenuPosition'],
    data() {
        return {
            markers: markerDataList,
            markerModel: {
                id: null,
                parentIndex: null,
                isPassage: null,
                hover: false,
                minimum: false,
                accessible: false,
                completable: false,
                finished: false,
            },
        };
    },
    computed: {
        positionLeft() {
            return this.contextMenuPosition.x;
        },
        positionTop() {
            return this.contextMenuPosition.y;
        },
    },
    methods: {
        resetMarkers(event) {
            let screen = this.$store.getters.screenContext;
            let screenId = parseInt(screen.dataset.id);
            let screenData = {
                id: screenId,
                markers: [],
            };

            this.$store.dispatch('update screen markers', screenData);

            if (this.$store.getters.settings.screens.autoClose.value)
                this.$emit('closeContextMenu');
        },
        selectMarker(event) {
            // Store the identifiers of the marker to pick
            let marker = event.target;
            let markerId = marker.dataset.id;

            // Get our current screen context of where markers will go
            let screen = this.$store.getters.screenContext;
            let screenId = parseInt(screen.dataset.id);
            let screenData = {};
            // The list of markers on a contextual screen
            let markers = this.$store.getters.screensMarkersList[screenId];

            let newMarker = this.markerModel;
            newMarker.id = markerId;
            newMarker.parentIndex = screenId;
            newMarker.isPassage = markerId.length > 1 ? false : true;

            let isMatched = false;

            let newMarkers = markers
                .filter(marker => {
                    if (marker.id === newMarker.id) isMatched = true;
                    return marker.id !== newMarker.id;
                })
                .concat(!isMatched ? [newMarker] : []);

            screenData.id = screenId;
            screenData.markers = newMarkers;

            this.$store.dispatch('update screen markers', screenData);

            if (this.$store.getters.settings.screens.autoClose.value)
                this.$emit('closeContextMenu');
        },
    },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/vars';
@import '../assets/styles/images';
@import '../assets/styles/mixins';

.context-menu {
    position: absolute;
    z-index: 300;
    width: 260px;
    left: 0;
    top: 0;
    right: auto;
    bottom: auto;

    .close {
        height: 30px;
        width: 30px;
        top: -30px;
        font-size: 30px;
        text-align: center;
        color: red;
        position: absolute;
        right: 0px;
        left: auto;
        bottom: auto;
        cursor: pointer;
    }

    .marker-reset-btn {
        padding: 7px;
        margin-bottom: 10px;
        text-align: center;
        border: 1px solid $blue-3;
        background-color: $blue-2;
        cursor: pointer;

        &:hover {
            background-color: $blue-1;
        }
    }

    .context-menu-wrap {
        .marker-category {
            border: 1px solid $blue-3;
            border-top-width: 0;

            .menu-item {
                width: calc(100% / 8);
                font-size: 0;

                &[data-type='dungeons'],
                &[data-type='entrances'] {
                    color: white;
                    font-size: 16px;
                    line-height: 0.8em;
                    text-transform: uppercase;
                }
            }

            &[data-compact='true'] {
                .marker-context-list[data-extra='true'] {
                    display: none;
                }
            }

            &[data-id='npc'] {
                .menu-item {
                    width: calc(100% / 5);
                }
            }

            &[data-id='entrances'] {
                .menu-item {
                    text-transform: uppercase;
                }
            }
        }

        ol,
        ul {
            background-color: $blue-1;
            margin: 0;
            padding: 0;

            @include clearfix;

            hr {
                margin: 0;
                padding: 0;
                height: 1px;
                border: 0;
                display: block;
                width: 100%;
                float: left;
                clear: both;
                background-color: $blue-2;
            }

            li {
                list-style: none;
                padding: 13px 10px 0;
                cursor: pointer;
                box-sizing: border-box;

                &.menu-item {
                    float: left;
                    height: 35px;
                    width: calc(100% / 8);
                    text-align: center;
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: auto 60%;

                    &.active {
                        border: 1px solid $gold-2;
                        box-sizing: border-box;
                    }

                    &[data-id='blocked'] {
                        background-image: url($image-marker-blocked);
                    }

                    &[data-id='passage'] {
                        background-image: url($image-marker-passage);
                    }

                    &[data-id='important'] {
                        background-image: url($image-marker-important);
                    }

                    &[data-id='chest'] {
                        background-image: url($image-marker-chest);
                    }

                    &[data-id='shop'] {
                        background-image: url($image-marker-shop);
                    }

                    &[data-id='manbo'] {
                        background-image: url($image-marker-manbo);
                    }

                    &[data-id='mamu'] {
                        background-image: url($image-marker-mamu);
                    }

                    &[data-id='shrine'] {
                        background-image: url($image-marker-shrine);
                    }

                    &[data-id='rooster'] {
                        background-image: url($image-marker-rooster);
                    }

                    &[data-id='tracy'] {
                        background-image: url($image-marker-tracy);
                    }

                    &[data-id='madbatter'] {
                        background-image: url($image-marker-madbatter);
                    }

                    &[data-id='witch'] {
                        background-image: url($image-marker-witch);
                    }

                    &[data-id='trendy'] {
                        background-image: url($image-marker-trendy);
                    }

                    &[data-id='richard'] {
                        background-image: url($image-marker-richard);
                    }

                    &[data-id='egg'] {
                        background-image: url($image-marker-egg);
                    }

                    &[data-id='phone'] {
                        background-image: url($image-marker-phone);
                    }

                    &[data-id='dungeon-color'] {
                        background-image: url($image-marker-dungeon-color);
                    }

                    &[data-id='madame'] {
                        background-image: url($image-marker-madame);
                    }

                    &[data-id='christine'] {
                        background-image: url($image-marker-christine);
                    }

                    &[data-id='papahl'] {
                        background-image: url($image-marker-papahl);
                    }

                    &[data-id='mrspapahl'] {
                        background-image: url($image-marker-mrspapahl);
                    }

                    &[data-id='sale'] {
                        background-image: url($image-marker-sale);
                    }

                    &[data-id='mrwrite'] {
                        background-image: url($image-marker-mrwrite);
                    }

                    &[data-id='chefbear'] {
                        background-image: url($image-marker-chefbear);
                    }

                    &[data-id='boomerang'] {
                        background-image: url($image-marker-boomerang);
                    }

                    &[data-id='sword'] {
                        background-image: url($image-marker-sword);
                    }

                    &[data-id='rocs_feather'] {
                        background-image: url($image-marker-rocs-feather);
                    }

                    &[data-id='power_bracelet'] {
                        background-image: url($image-marker-power-bracelet);
                    }

                    &[data-id='power_bracelet_l2'] {
                        background-image: url($image-marker-power-bracelet-l2);
                    }

                    &[data-id='pegasus_boots'] {
                        background-image: url($image-marker-pegasus-boots);
                    }

                    &[data-id='zoras_flippers'] {
                        background-image: url($image-marker-zoras-flippers);
                    }

                    &[data-id='hookshot'] {
                        background-image: url($image-marker-hookshot);
                    }

                    &[data-id='bomb'] {
                        background-image: url($image-marker-bomb);
                    }

                    &[data-id='mirror_shield'] {
                        background-image: url($image-marker-mirror_shield);
                    }
                }

                &:hover,
                &.heading {
                    background-color: $blue-2;
                }

                &.heading {
                    border-top: 1px solid $blue-3;
                    border-bottom: 1px solid $blue-3;
                    padding-bottom: 6px;
                }
            }
        }
    }
}
</style>
