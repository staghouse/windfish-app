<template lang="pug">
header.navigation
    nav.grid-container
        .short-title Windfish
        ol
            a(href='/beta/tracker')
                li Use It Now
            a(href='#features')
                li Features
            a(href='https://github.com/ericlakatos/windfish-app/issues')
                li Feedback
</template>

<script>
export default {
    name: 'Navigation',
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/_mixins';
@import '../../assets/styles/_vars';

.navigation {
    background-color: white;
    width: 100%;
    border-bottom: 1px solid $blue-1;
    overflow: hidden;

    .grid-container {
        display: flex;
        align-items: center;
        justify-content: center;

        @include mediaMax(569px) {
            display: block;
            padding-bottom: 20px;
            padding-left: 20px;
            padding-right: 20px;
        }
    }

    nav {
        padding-top: 30px;
        padding-bottom: 30px;

        a {
            display: inline-block;
            padding: 0 15px;
            box-sizing: border-box;
            text-decoration: none;

            &:last-of-type {
                padding-right: 0;
            }

            @include mediaMax(569px) {
                padding: 0;
                text-align: center;
            }
        }

        .short-title {
            font-size: 28px;
            font-weight: bold;
            color: $blue-4;
            font-family: $font-family-display;
            flex: 1;

            @include mediaMax(569px) {
                float: none;
                text-align: center;
                padding-bottom: 20px;
                font-size: 40px;
            }
        }

        ol {
            flex: 4;
            text-align: right;

            @include mediaMax(569px) {
                text-align: center;
                display: flex;
                justify-content: space-between;
            }

            li {
                cursor: pointer;
                display: inline;
                color: $blue-1;
                box-sizing: border-box;
                font-size: 16px;
                padding: 32px 0 0;
                font-weight: bold;
                text-transform: uppercase;
                font-family: $font-family-read;

                &.active {
                    border-bottom: 5px solid $blue-2;
                }

                @include mediaMax(569px) {
                    font-size: 14px;
                    padding: 15px 0;
                }
            }
        }
    }
}
</style>
