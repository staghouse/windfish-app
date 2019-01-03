<template lang="pug">

.masthead
    .grid-container
        .masthead-image
            img(
            src="~/static/images/display/windfish.png",
            alt="The Windfish",
            title="The Windfish")

        .masthead-copy
            h1 Windfish.io
            h2 Windfish is a game tracker that works in all major web browsers and is designed for tracking progress in The Legend of Zelda: Link's Awakening DX 
                a(
                href="https://sites.google.com/view/z4randomizer",
                target="_blank")
                    u Randomizer
            a(
            href="/tracker",
            class="btn-link")
                button.green
                    span Use It Now

            

</template>

<script>
export default {
    name: 'Masthead',
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/_vars';
@import '../../assets/styles/_mixins';

.masthead {
    background-color: transparent;
    padding: 60px 0;

    .masthead-image {
        max-width: 570px;
        text-align: center;
        margin: 0 auto;

        img {
            max-width: 400px;
            width: 100%;
            height: auto;
        }
    }

    .masthead-copy {
        max-width: 570px;
        margin: 30px auto 0;
        text-align: center;
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        & > * {
            flex: 0 0 100%;
        }

        & > span {
            font-family: $font-family-display;
            font-size: 24px;
            display: inline-flex;
            margin: 0 20px;
            flex: none;

            @include mediaMax(569px) {
                display: block;
                margin: 0 auto;
            }
        }

        a {
            color: inherit;
        }

        .btn-link {
            flex: 1;

            @include mediaMax(569px) {
                flex: 0 0 100% !important;
            }
        }

        h1 {
            font-family: $font-family-display;
            font-size: 90px;
            margin-bottom: 30px;

            @include mediaMax(569px) {
                font-size: 50px;
            }
        }

        h2 {
            font-size: 24px;
            line-height: 1.3em;
            margin-bottom: 30px;

            @include mediaMax(569px) {
                font-size: 18px;
                text-align: left;
            }

            a {
                &:hover {
                    color: $blue-4;
                }
            }
        }

        button {
            background-color: $blue-3;
            border: 1px solid lighten($blue-4, 10%);
            border-radius: 5px;
            width: 100%;
            margin: {
                top: 20px;
                left: auto;
                right: auto;
                bottom: 20px;
            }

            span {
                padding: 10px 10px;
                display: inline-flex;
                color: white;
                font-family: $font-family-read;
                font-size: 20px;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-weight: bold;
            }

            &.green {
                background-color: $green;
                border-color: lighten($green, 10%);
            }
        }
    }
}
</style>
