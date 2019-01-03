<template lang="pug">

.context-menu(
    v-bind:style="{left: contextMenuPosition.x, top: contextMenuPosition.y}",
    v-bind:data-layout-stream="$store.getters.settings.trackers.layoutStream.value")
    .close(
    @click='$emit("closeContextMenu")') x

    button(
    @click="resetMarkers") Reset Markers
    
    .context-menu-wrap

        ol.context-categories
            .marker-category(
            v-for='(list, index) in markers',
            v-bind:key='index'
            v-bind:data-id='list.id',
            v-bind:data-compact='$store.getters.settings.screens.compactMarkers.value',
            v-bind:data-extra='list.isExtra')

                ol.marker-context-list
                    li.heading {{list.heading}}

                    li.menu-item(
                    @click='selectMarker',
                    v-for='(marker, i) in list.contents',
                    v-bind:key='i',
                    v-bind:data-id='marker.id',
                    v-bind:data-type='list.id',
                    v-bind:style="{backgroundImage: marker.id.length > 1? `url(/images/sprites/${marker.id}.png)`: 'none'}"
                    v-bind:title='marker.title') {{marker.id}}

</template>

<script>
import markerDataList from '~/assets/js/data/markers';
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
@import '../../assets/styles/vars';
@import '../../assets/styles/images';
@import '../../assets/styles/mixins';

.context-menu {
    position: absolute;
    z-index: 400;
    width: 260px;
    left: 0;
    top: 0;
    right: auto;
    bottom: auto;

    .close {
        height: 30px;
        width: 30px;
        top: -40px;
        font-size: 30px;
        text-align: center;
        color: red;
        position: absolute;
        right: 0px;
        left: auto;
        bottom: auto;
        cursor: pointer;
    }

    button {
        position: absolute;
        top: -40px;
        left: 0;
    }

    .context-menu-wrap {
        .marker-category {
            border: 1px solid $blue-3;
            border-top-width: 0;
            border-bottom-width: 0;

            &:last-of-type {
                border-bottom-width: 1px;
            }

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

            &[data-compact='true'][data-extra='true'] {
                display: none;
            }

            &[data-id='npc'] {
                .menu-item {
                    width: calc(100% / 7);
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

    &[data-layout-stream='true'] {
        left: 0 !important;
        top: 0 !important;

        .marker-category {
            &:first-of-type {
                // border-top-width: 1px;

                // .heading {
                //     display: none;
                // }
            }
        }

        .heading {
            padding: 7px 7px 0;
            line-height: 7px;
            font-size: 10px;
        }
    }
}
</style>
