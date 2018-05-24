<template lang="pug">
    div.twitch-auth(v-bind:class="{hide: hideAuthModal}")
        div.twitch-auth__wrap
            p.title Log in with Twitch.tv?
            span (Chat integration)
            span.error(v-if="authHadError") Sorry, we couldn't valid you...
            a.button(v-bind:href="authURI")
                button.login Log In
            button.cancel(
                @click="hideAuthModal = true") No Thanks
</template>

<script>
import { authGetUser } from '../utils';
export default {
    name: 'TwitchAuth',
    data() {
        return {
            authURI: '/beta/auth',
            devAuthURI: 'http://localhost:3000/beta/auth',
            authHadError: false,
            hideAuthModal: true,
        };
    },
    beforeMount() {
        const url = document.location;
        let response = null;

        if (url.port !== '3000') {
            this.authURI = this.devAuthURI;
        }

        if (url.hash) {
            const params = url.hash.split('&');

            params.forEach(param => {
                let p = param.split('=');

                if (p[0].includes('access_token')) {
                    let token = p[1];

                    response = authGetUser(this.authURI, token);
                    response
                        .then(res => {
                            if (res.authenticated) {
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
        } else {
            this.hideAuthModal = false;
        }
    },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/_vars';

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

        span {
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
        }
    }
}
</style>
