<template lang="pug">

.settings-list
    .settings-group
        h5 Broadcast Mode
        ol.inner-settings-list
            h6 Shared Session
            
            textarea(
            class="hidden",
            ref="dummyOutput")

            li
                p.small Click to copy

                input(
                type="text",
                placeholder="Your generated seed",
                class="seedField"
                v-bind:value="stashedSeedValue",
                @click="copySeedValue",
                @input="validateSeedInput",
                ref="seedOutputField")

            li
                button(
                v-bind:disabled="hasConnectedSocket",
                @click.prevent="generateSeed") Generate Seed

            li
                button(
                class="connect-btn",
                v-if="hasGeneratedSeed",
                @click="toggleConnection('socket')",
                v-bind:class="{connected: hasConnectedSocket}") {{hasConnectedSocket? "Stop Broadcast": "Start Broadcast"}}

            li
                button(
                class="connect-btn",
                v-if="authedUser",
                @click="toggleConnection('bot')",
                v-bind:disabled="!hasConnectedSocket",
                v-bind:class="{connected: hasConnectedBot}") {{hasConnectedBot? "Disconnect Bot": "Connect Bot"}}

</template>

<script>
import { createHash } from '../utils';

export default {
    name: 'ServerOptions',
    props: ['authedUser'],
    data() {
        return {
            hasGeneratedSeed: false,
            hasConnectedSocket: false,
            hasConnectedBot: false,
            stashedSeedValue: null,
        };
    },
    mounted: function() {
        window.onbeforeunload = this.closeAllConnections;
    },
    methods: {
        closeAllConnections() {
            this.$socket.emit('disconnect bot');
            this.$socket.disconnect();
        },
        validateSeedInput(event) {
            let target = event.target;

            if (this.hasConnectedSocket) {
                target.value = this.stashedSeedValue;
            } else {
                if (target.value.length > 0) {
                    this.hasGeneratedSeed = true;
                    this.stashedSeedValue = target.value;
                } else {
                    this.hasGeneratedSeed = false;
                    this.stashedSeedValue = '';
                }
            }
        },
        copySeedValue(event) {
            if (this.stashedSeedValue) {
                this.$refs.seedOutputField.classList.remove('copied');
                this.$refs.dummyOutput.value = this.stashedSeedValue;

                try {
                    this.$refs.dummyOutput.select();
                    document.execCommand('copy');
                    this.$refs.seedOutputField.classList.add('copied');
                } catch (error) {
                    console.log(error);
                } finally {
                    window.getSelection().removeAllRanges();
                }
            }
        },
        generateSeed() {
            let predefinedSeed = this.$refs.seedOutputField.value;
            let hash = createHash(predefinedSeed);

            if (hash) {
                this.stashedSeedValue = hash;
                this.hasGeneratedSeed = true;
            }
        },
        toggleConnection(connectionType) {
            switch (connectionType) {
                case 'socket':
                    if (this.hasConnectedSocket) {
                        this.$socket.disconnect();
                        this.hasConnectedSocket = false;
                    } else {
                        if (this.hasGeneratedSeed) {
                            this.$socket.connect();
                            this.$socket.emit(
                                'connection broadcast',
                                this.stashedSeedValue
                            );
                            this.hasConnectedSocket = true;
                        }
                    }
                    break;

                case 'bot':
                    if (this.hasConnectedSocket && !this.hasConnectedBot) {
                        let botConfig = {
                            whitelist: this.$botWhitelist.whitelist,
                            channel: this.authedUser,
                        };

                        this.$socket.emit('connection bot', botConfig);
                        this.hasConnectedBot = true;
                    } else {
                        this.$socket.emit('disconnect bot');
                        this.hasConnectedBot = false;
                    }
                    break;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/vars';
@import '../assets/styles/mixins';

.settings-list {
    h5 {
        background-color: purple;
        border: 1px solid lighten(purple, 20%);
    }

    .hidden {
        position: absolute;
        z-index: -999999;
        pointer-events: none;
        opacity: 0;
        height: 0;
    }

    li {
        display: block !important;

        .small {
            margin: 0;
            font-size: 12px;
            margin-bottom: 10px;
        }

        .seedField {
            display: block;
            background-color: $blue-1;
            border: 1px solid $blue-3;
            width: 100%;
            color: white;
            padding: 10px;
            font-size: 16px;
            box-sizing: border-box;
            font-family: $font-family;
            overflow: hidden;
            cursor: pointer;

            &.copied {
                animation: copied 1s ease-out;
            }

            span {
                color: gray;
            }
        }

        input {
            &[type='text'] {
                flex: 0 0 100% !important;

                &[disabled] {
                    opacity: 0.5;
                }
            }
        }

        button {
            margin-top: 10px;

            &:first-of-type {
                margin-top: 0;
            }
        }

        .connect-btn {
            background-color: seagreen;
            border-color: green;
            color: white;

            &.connected {
                background-color: darken(salmon, 10%);
                border-color: salmon;
                color: white;
            }
        }
    }
}
</style>
