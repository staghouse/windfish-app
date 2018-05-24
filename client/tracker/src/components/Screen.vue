<template lang="pug">

.screen(
@click='screenCleared = !screenCleared',
@contextmenu.prevent='$emit("showContextMenu", $event)',
v-bind:data-cleared='screenCleared',
v-bind:data-id='position',
ref="screen")

    .screen__marker-wrap
        .marker(
        @mouseenter='$emit("markerIsHovered", $event)',
        @mouseleave='$emit("markerIsHovered", null)',
        v-for='(marker, i) in markerData',
        v-bind:key='i',
        v-bind:data-id='marker.id',
        v-bind:data-index-id='position',
        v-bind:data-minimum="!isNaN(parseInt(marker.id))? $store.getters.dungeonStates[parseInt(marker.id) - 1].minimum: false",
        v-bind:data-accessible="!isNaN(parseInt(marker.id))? $store.getters.dungeonStates[parseInt(marker.id) - 1].accessible: false",
        v-bind:data-completable="!isNaN(parseInt(marker.id))? $store.getters.dungeonStates[parseInt(marker.id) - 1].completable: false",
        v-bind:data-finished="!isNaN(parseInt(marker.id))? $store.getters.dungeonStates[parseInt(marker.id) - 1].finished: false",
        v-bind:class='{passage: (marker.id.length < 2), hovered: marker.hover}',
        v-bind:style="{backgroundImage: `url('../../static/images/markers/marker_${marker.id}.png')`}")
            span.text(v-if='marker.id.length < 2') {{marker.id}}

        span.no-entrance(
        v-if='$store.getters.settings.screens.showEntrances.value && !screenData[position].hasEntrance')

</template>

<script>
import screenDataList from '../data/screens';
export default {
    name: 'Screen',
    props: ['data', 'index'],
    data() {
        return {
            screenData: screenDataList,
            screenCleared: false,
            position: this.index,
        };
    },
    computed: {
        markerData() {
            return this.$store.getters.screensMarkersList[this.index];
        },
    },
    // watch: {
    //     newMarkerData: function(newValue) {
    //         if (newValue.id === this.markerData.id) {
    //             this.markerData = newValue.markers;
    //         }
    //     },
    // },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/vars';
@import '../assets/styles/images';
@import '../assets/styles/mixins';

.screen {
    position: relative;
    float: left;
    overflow: hidden;
    width: calc(100% / 16);
    padding-bottom: calc(100% / 16);
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 101;

    &[data-cleared] {
        &::after {
            @extend %full-abs;
            z-index: 1;
            background-color: $blue-1;
            background-size: contain;
            background-position: center;
            background-image: url($image-marker-cleared);
            opacity: 1;
        }
    }

    &__marker-wrap {
        @extend %full-abs;
        // pointer-events: none;
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        box-sizing: border-box;
        border: $grid-gutter-size solid $blue-1;

        .no-entrance {
            @extend %full-abs;
            z-index: 1;
            background-color: $blue-1;
            opacity: 0.7;
        }

        .marker {
            z-index: 2;
            position: relative;
            flex: 0 0 50%;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            background-color: rgba(4, 8, 24, 0.9);
            box-sizing: border-box;
            text-align: center;

            .text {
                position: absolute;
                left: 0;
                right: 0;
                bottom: auto;
                margin: 0 auto;
                top: 50%;
                transform: translateY(-50%);
                color: white;
                font-size: 14px;
                height: 14px;

                @include mediaMax(400px) {
                    font-size: 12px;
                    height: 12px;
                }
            }

            &:only-of-type {
                flex: 1;

                &.text {
                    & > * {
                        font-size: 20px;
                        height: 16px;
                    }
                }
            }

            &[data-id='1'],
            &[data-id='2'],
            &[data-id='3'],
            &[data-id='4'],
            &[data-id='5'],
            &[data-id='6'],
            &[data-id='7'],
            &[data-id='8'] {
                background-color: darken(tomato, 10%);
            }

            &[data-minimum='true'] {
                background-color: darken(darkorange, 5%) !important;
            }

            &[data-accessible='true'] {
                background-color: darken(gold, 5%) !important;
            }

            &[data-completable='true'] {
                background-color: darken(mediumseagreen, 5%) !important;
            }

            &[data-finished='true'] {
                background-color: $blue-1 !important;
            }

            &.hovered {
                background-color: white !important;

                * {
                    color: $blue-1 !important;
                }
            }
        }
    }

    &.hovered {
        &::after {
            @extend %full-abs;
            z-index: 9;
            content: '';
            background-color: lightgreen;
            opacity: 0.8;
        }
    }

    &.cleared {
        &::after {
            @extend %full-abs;
            z-index: 10;
            background-color: $blue-1;
            background-size: contain;
            background-position: center;
            background-image: url($image-marker-cleared);
        }
    }
}
</style>
