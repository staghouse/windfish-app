<template lang="pug">
#app
</template>

<script>
import { authGetUser } from '~/assets/js/utils';
export default {
    name: 'App',
    data() {
        return {
            authURI: '/beta/auth/twitch/user',
        };
    },
    beforeMount() {
        const url = document.location;

        if (url.hash) {
            const params = url.hash.split('&');

            params.forEach(param => {
                let p = param.split('=');

                if (p[0].includes('access_token')) {
                    let token = p[1];

                    let response = authGetUser(this.authURI, token);
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