<template lang="pug">

.settings-list
    .settings-group
        h5 Broadcast Mode
        ol.inner-settings-list(v-if="$store.getters.socketAvailable")
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
                v-bind:class="{connected: hasConnectedBot, disabled: !hasConnectedSocket}") {{hasConnectedBot? "Disconnect Bot": "Connect Bot"}}

        ol.inner-settings-list(v-else)
            li
                p.small Sorry, Broadcast Mode is currently unavailable
</template>

<script>
import { BotWhitelist, generateStateItemUpdateData, createSessionID } from '~/assets/js/utils';

import io from 'socket.io-client';

export default {
    name: 'BroadcastOptions',
    props: ['authedUser'],
    data() {
        return {
            hasGeneratedSeed: false,
            hasConnectedSocket: false,
            hasConnectedBot: false,
            stashedSeedValue: null,
            botWhitelist: new BotWhitelist(),
        };
    },
    methods: {
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
            let hash = createSessionID(predefinedSeed);

            if (hash) {
                this.stashedSeedValue = hash;
                this.hasGeneratedSeed = true;
            }
        },
        toggleConnection(connectionType) {
            switch (connectionType) {
                case 'socket':
                    if (this.hasConnectedSocket) {
                        if (this.hasConnectedBot) {
                            this.$store.getters.socket.emit('disconnect bot');
                            this.hasConnectedBot = false;
                        }

                        this.hasConnectedSocket = false;
                        this.$store.dispatch('update socket connection', false);

                        this.$store.getters.socket.disconnect();
                    } else {
                        if (this.hasGeneratedSeed) {
                            this.$store
                                .dispatch('update socket', io(/* should default to root */))
                                .then(() => {
                                    this.$store.getters.socket.emit('connection broadcast', this.stashedSeedValue);
                                    this.$store.dispatch('update socket connection', true);
                                    this.hasConnectedSocket = true;
                                    this.bindAllSockets();
                                    this.bindDisconnect();
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        }
                    }
                    break;

                case 'bot':
                    if (this.hasConnectedSocket && !this.hasConnectedBot) {
                        let botConfig = {
                            whitelist: this.botWhitelist.whitelist,
                            channel: this.authedUser,
                        };

                        this.$store.getters.socket.emit('connection bot', botConfig);

                        this.hasConnectedBot = true;
                    } else {
                        this.$store.getters.socket.emit('disconnect bot');
                        this.hasConnectedBot = false;
                    }
                    break;
            }
        },
        bindDisconnect() {
            window.addEventListener('beforeunload', () => {
                this.$store.getters.socket.emit('disconnect bot');
                this.$store.getters.socket.disconnect();
            });
        },
        bindAllSockets() {
            let self = this;

            this.$store.getters.socket.on('update whitelist add', user => {
                let whitelist = self.botWhitelist.add(user);

                this.$store.getters.socket.emit('update bot whitelist', whitelist);
            });

            this.$store.getters.socket.on('update whitelist remove', user => {
                let whitelist = self.botWhitelist.remove(user);

                this.$store.getters.socket.emit('update bot whitelist', whitelist);
            });

            this.$store.getters.socket.on('update broadcast data', newItemData => {
                this.$store.dispatch('update broadcast data', newItemData);
            });

            this.$store.getters.socket.on('update tracker data', userData => {
                let dataToUpdate = generateStateItemUpdateData(self.$store.getters.items, userData.argument2);

                if (dataToUpdate.index !== null && dataToUpdate.item !== null) {
                    userData.resolved = true;
                    self.$store
                        .dispatch('update item data', dataToUpdate)
                        .then(() => {
                            this.$store.getters.socket.emit('bot dequeue', userData);

                            this.$store.getters.socket.emit('send broadcast data', self.$store.getters.items);
                        })
                        .catch(error => {
                            console.log('Promise failed: ' + error);
                        });
                } else {
                    userData.resolved = false;
                    this.$store.getters.socket.emit('bot dequeue', userData);
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/vars';
@import '../../assets/styles/mixins';

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

            &:only-of-type {
                margin-bottom: 0;
            }
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

            &.disabled {
                display: none;
            }
        }
    }
}
</style>
