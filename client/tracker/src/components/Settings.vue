<template lang="pug">
.settings-menu
    <ServerOptions/>
    <SettingsList/>
</template>

<script>
import ServerOptions from './ServerOptions';
import SettingsList from './SettingsList';

export default {
    name: 'Settings',
    components: {
        ServerOptions,
        SettingsList,
    },
};
</script>

<style lang="scss">
@import '../assets/styles/vars';
@import '../assets/styles/mixins';
@import '../assets/styles/images';

.settings-menu {
    box-sizing: border-box;
    width: $settings-width;
    height: 100%;
    overflow-x: auto;
    overflow-y: scroll;
    position: fixed;
    transition: left 0.2s;
    right: 0;
    top: 0;
    bottom: 0;
    box-sizing: border-box;
    background-color: $blue-1;
    border-left: 1px solid $blue-2;
    color: white;
    z-index: 400;
    padding: 70px 30px;

    @include clearfix;

    h5 {
        box-sizing: border-box;
        margin-bottom: 5px;
        clear: both;
        background-color: $blue-2;
        border: 1px solid $blue-3;
        font-size: 16px;
        padding: 7px 10px 4px;
        line-height: 1em;
        text-transform: capitalize;

        &[data-group-name='configuration'] {
            background-color: dimgray;
            border-color: darkgray;
        }

        &[data-group-name='broadcast options'] {
            background-color: purple;
            border: 1px solid lighten(purple, 20%);
        }
    }

    .settings-list {
        &:last-of-type {
            margin-bottom: 150px;
        }
    }

    .settings-group {
        margin-bottom: 30px;

        .inner-settings-list {
            @include clearfix;
            margin-top: 30px;

            &:first-of-type {
                margin-top: 0;
            }

            li {
                position: relative;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                margin-bottom: 10px;

                input {
                    flex: 0;
                }

                label {
                    flex: 1;
                }

                &:empty {
                    margin-bottom: 0;
                }

                .fields {
                    width: 100%;

                    .field {
                        width: 100%;
                        margin-bottom: 20px;
                    }
                }
            }

            h6 {
                margin: 20px 0 20px;
                width: 100%;
                border-bottom: 1px solid $blue-3;
                padding-bottom: 4px;
                font-size: 14px;
                clear: both;
                flex: 100%;

                &:only-child {
                    margin-bottom: 10px;
                }
            }

            .small {
                color: gray;
                font-size: 12px;
                clear: left;
                float: left;
                text-align: left;
                line-height: 1.2em;
                margin-top: 5px;
            }

            .color-options {
                flex: 100%;
                clear: both;
                display: block;

                output {
                    clear: both;
                    display: block;
                    color: gray;
                    margin-top: 10px;
                }

                .color-reset {
                    clear: both;
                    display: block;
                    cursor: pointer;
                    font-size: 14px;
                    margin-top: 10px;
                    padding: 10px 10px 6px;
                    color: white;
                    border: 1px solid $blue-3;
                    background-color: $blue-2;
                }
            }

            label {
                font-size: 14px;
                line-height: 1em;
                margin-left: 10px;
                margin-bottom: 10px;
                clear: right;

                &:last-of-type {
                    margin-bottom: 0;
                }

                &.floater {
                    clear: left;
                    margin-left: 0;
                    margin-right: 10px;
                }

                &[for='borderImageSilver'],
                &[for='borderImageGold'] {
                    width: 30px;
                    border-width: 0;
                    border-top-width: 11px;
                    border-style: solid;
                    border-image-slice: 11;
                    border-image-repeat: round;
                    box-sizing: border-box;
                    font-size: 0;
                }

                &[for='borderImageSilver'] {
                    border-image-source: url('../'+$image-border);
                }

                &[for='borderImageGold'] {
                    border-image-source: url('../'+$image-border-gold);
                }
            }

            label,
            input {
                cursor: pointer;
                float: left;
                margin-top: 0;
                margin-bottom: 0;
            }

            input {
                clear: both;
                margin-top: 0;

                &[type='text'] {
                    display: block;
                    background-color: $blue-1;
                    border: 1px solid $blue-3;
                    width: 100%;
                    color: white;
                    padding: 10px;
                    font-size: 16px;
                    box-sizing: border-box;
                    font-family: $font-family;
                }

                &[type='color'] {
                    position: relative;
                    margin-top: 20px;
                    flex: 1 !important;
                    display: block;

                    & ~ output {
                        clear: both;
                        margin-left: 0;
                        margin-top: 10px;
                    }

                    & + label {
                        position: absolute;
                        margin: 0;
                        left: 0;
                        top: 55px;
                    }
                }

                &[type='range'] {
                    clear: none;
                    width: 100px;
                    margin: 0;
                    margin-bottom: 5px;
                    -moz-appearance: none;
                    -webkit-appearance: none;
                    flex: 1 !important;

                    &::-moz-range-track {
                        background-color: white;
                        height: 4px !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        border: 0 !important;
                        border-radius: 2px !important;
                    }

                    &::-webkit-slider-runnable-track {
                        background-color: white;
                        height: 4px !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        border: 0 !important;
                        border-radius: 2px !important;
                    }

                    &::-webkit-slider-thumb {
                        margin-top: -5px !important;
                    }

                    & + label {
                        position: absolute;
                        margin: 0;
                        left: 0;
                        top: 0;
                    }
                }
            }
        }
    }
}
</style>
