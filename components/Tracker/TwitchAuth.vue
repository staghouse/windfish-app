<template lang="pug">
    div.twitch-auth(
    v-bind:class="{hide: hideAuthModal}",
    @click.stop.self="hideAuthModal = true")
        div.twitch-auth__wrap
            p.title Welcome to the Windfish.io beta!
            span Please provide feedback whereever you may have any. You can log an issue on github by clicking the bug icon in the menu or by messaging in the Discord server  
                a(href="https://discord.gg/RRuA34C") here
            p.title Log in with Twitch.tv?
            span (Twitch chat integration)
            span.error(v-if="authHadError") Sorry, we couldn't validate you...
            a.button(v-bind:href="authURI")
                button.login Log In
            button.cancel(
                @click="hideAuthModal = true") No Thanks

            span No permissions are requested. Windfish only needs your username.
</template>

<script>
import { authGetUser } from '~/assets/js/utils';
export default {
    name: 'TwitchAuth',
    data() {
        return {
            authURI: '/beta/auth/twitch/',
            authHadError: false,
            hideAuthModal: window.location.search.length > 0 ? true : false,
        };
    },
    beforeMount() {
        if (this.hideAuthModal === true) {
            const paramsString = window.location.search.substr(1);
            const params = paramsString.split('&');

            history.pushState('', document.title, window.location.pathname);

            params.forEach(param => {
                let p = param.split('=');

                if (p[0].includes('code')) {
                    let code = p[1];

                    let response = authGetUser(this.authURI, code);
                    response
                        .then(res => {
                            if (res) {
                                this.$emit('gotAuthedUser', res.username);
                                this.hideAuthModal = true;
                            } else {
                                this.authHadError = true;
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            });
        }
    },
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/_vars';

.twitch-auth {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    margin: 0 auto;
    z-index: 1000;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: rgba(1, 6, 25, 0.3);
    cursor: pointer;

    &.hide {
        display: none;
    }

    &__wrap {
        max-width: 500px;
        background-color: $blue-1;
        padding: 50px;
        text-align: center;

        .title {
            font-size: 24px;
        }

        a {
            color: white;
        }

        span {
            margin: 20px auto;
            color: gray;
            display: block;

            &.error {
                color: salmon;
                margin-top: 5px;
            }
        }

        button.login {
            display: flex;
            align-items: center;
            justify-content: space-around;
            background-color: purple;
            border-color: darken(purple, 10%);
            color: white;

            p {
                display: inline-block;
            }
        }

        .logo-twitch {
            width: 100%;
            height: auto;
            max-width: 20px;
            display: inline-block;
            margin: 0 auto;
        }

        button {
            float: none;
            margin-left: auto;
            margin-right: auto;
            margin-top: 10px;
        }
    }
}
</style>
