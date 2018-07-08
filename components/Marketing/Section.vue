<template lang="pug">
section#features
    .grid-container
        .copy
            h4 {{ feature.title }}
            p {{ feature.description }}
            ol
                li(
                    v-for="(item, key) in feature.content",
                    v-bind:key="key") {{ item.title }}

                    ol(
                    v-if="item.list")
                        li(
                        v-for="(listItem, key) in item.list",
                        v-bind:key="key") {{ listItem }}
        .image
            img(
            v-bind:data-id="feature.title.toLowerCase()",
            v-bind:src='`/images/display/tracker-${feature.title.toLowerCase()}.${extension}`',
            v-bind:alt='feature.title')
        
</template>

<script>
export default {
    name: 'Section',
    props: ['feature'],
    data() {
        return {
            extension: this.feature.title.toLowerCase() === 'misc' ? 'gif' : 'png',
        };
    },
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/_mixins';
@import '../../assets/styles/_vars';
section {
    background-color: $blue-1;
    padding: 60px 0;
    border-bottom: 1px solid $blue-2;

    .grid-container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }

    .copy {
        flex: 1;
        box-sizing: border-box;
        padding-right: 60px;

        @include mediaMax(799px) {
            padding-right: 0;
        }

        h4 {
            font-size: 40px;
            font-family: $font-family-display;
            margin-bottom: 30px;
            color: $blue-4;
            font-weight: bold;

            @include mediaMax(569px) {
                font-size: 30px;
            }
        }

        p {
            font-size: 24px;
            color: $green;
        }

        ol,
        ul {
            margin-top: 20px;
            margin-left: 20px;

            li {
                margin-bottom: 30px;
                font-size: 20px;
                line-height: 1.2em;
                color: white;
                position: relative;

                &::before {
                    text-align: center;
                    content: '\2022';
                    position: absolute;
                    left: -30px;
                    top: 0;
                    height: 100%;
                    width: 30px;
                    color: $blue-3;
                }
            }

            ol,
            ul {
                li {
                    font-size: 16px;
                    margin-bottom: 15px;
                    color: darken(white, 30%);

                    &::before {
                        color: white;
                    }
                }
            }
        }
    }

    .image {
        flex: 1;
        box-sizing: border-box;
        height: auto;
        align-self: center;
        display: contents;
        position: relative;

        img {
            width: 100%;
            height: auto;
            max-width: 400px;
            max-height: 400px;

            &[data-id='misc'] {
                // position: absolute;
                max-width: 321px;
                margin-bottom: -260px;
                // right: 0;

                @include mediaMax(799px) {
                    max-width: 260px;
                    margin-bottom: -102px;
                }
            }

            @include mediaMax(799px) {
                margin-top: 60px;
            }
        }
    }

    .copy,
    .image {
        @include mediaMax(799px) {
            flex: 0 0 100%;
        }
    }
}
</style>
