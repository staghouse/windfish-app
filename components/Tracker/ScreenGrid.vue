<template lang="pug">

.screen-grid(
v-bind:class='{guttered: $store.getters.settings.screens.showGutter.value}')
    .grid-top-gutter
        .gutter(
        v-for='(num, index) in gutterColumnTotal',
        v-bind:key='index')
            p {{index}}

    .grid-left-gutter
        .gutter(
        v-for='(num, index) in gutterRowTotal',
        v-bind:key='index')
            p {{alphabet[index]}}

    .grid-wrap(
    ref="screenWrap")
        Screen(
        v-for='(data, index) in screenData',
        v-bind='{data, index}',
        v-bind:key='index',
        v-on:markerIsHovered="highlightMatchingMarkers($event)"
        v-on:showContextMenu='$emit("showContextMenu", $event)')

        .map(
        v-bind:style="{opacity: $store.getters.settings.screens.mapOpacity.value}",
        v-bind:data-map-original="$store.getters.settings.screens.mapTypeOriginal.value",
        v-bind:data-map-improved="$store.getters.settings.screens.mapTypeImproved.value",
        v-bind:data-map-detailed="$store.getters.settings.screens.mapTypeDetailed.value")


</template>

<script>
import screenDataList from '~/assets/js/data/screens';
import Screen from '~/components/Tracker/Screen';

let rows = 16;

export default {
    components: {
        Screen,
    },
    data() {
        return {
            screenData: screenDataList,
            screenTotal: rows * rows,
            gutterColumnTotal: rows + 1,
            gutterRowTotal: rows,
            alphabet: 'abcdefghijklmnopqrstuvwxz',
        };
    },
    methods: {
        highlightMatchingMarkers(event) {
            let screensMarkersList = this.$store.getters.screensMarkersList;
            let listOfCouldHover = [];

            screensMarkersList.map(screenMarkerList => {
                let filtered = screenMarkerList.filter(
                    marker => marker.isPassage
                );

                if (filtered.length < 1) {
                    return;
                } else {
                    let listOfShouldHover = [];
                    listOfCouldHover = [...listOfCouldHover, ...filtered];

                    listOfCouldHover.map(marker => {
                        if (event !== null) {
                            let hoveredId = event.target.dataset.id;
                            let hoveredIndexId = event.target.dataset.indexId;

                            if (hoveredId === marker.id) {
                                listOfShouldHover = [
                                    ...listOfShouldHover,
                                    marker,
                                ];
                            }
                        } else {
                            marker.hover = false;
                        }
                    });

                    if (listOfShouldHover.length > 1) {
                        listOfShouldHover.map(marker => (marker.hover = true));
                    }
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/mixins';
@import '../../assets/styles/images';
.screen-grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    grid-template-rows: auto;
    z-index: 101;

    .map {
        @extend %full-abs;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        image-rendering: pixelated;
        user-select: none;
        pointer-events: none;
        z-index: 100;

        &[data-map-original='true'] {
            background-image: url($image-overworld-original);
        }

        &[data-map-improved='true'] {
            background-image: url($image-overworld-improved);
        }

        &[data-map-detailed='true'] {
            background-image: url($image-overworld-detailed);
        }
    }

    .gutter {
        position: relative;

        p {
            text-transform: uppercase;
            align-items: center;
            justify-content: center;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            margin: 0 auto;
            top: 50%;
            transform: translateY(-50%);
            color: white;
            text-transform: uppercase;
            text-align: center;
            width: 100%;
            line-height: 1.2em;
        }
    }

    .grid-top-gutter {
        display: none;
        grid-column: 1 / -1;
        grid-row: 1;

        @include clearfix;

        .gutter {
            width: calc(100% / 17);
            padding-bottom: calc(100% / 17);
            float: left;

            &:first-of-type {
                opacity: 0;
            }
        }
    }

    .grid-left-gutter {
        display: none;
        grid-column: 1;
        grid-row: 2;

        .gutter {
            height: calc(100% / 16);
            display: block;
        }
    }

    .grid-wrap {
        position: relative;
        grid-column: 1 / -1;
        grid-row: 1;
    }

    &.guttered {
        grid-template-columns: repeat(17, 1fr);

        .grid-top-gutter {
            display: block;
        }

        .grid-left-gutter {
            display: block;
        }

        .grid-wrap {
            grid-column: 2 / -1;
            grid-row: 2;
        }
    }
}
</style>
