import { createSessionID } from '~/assets/js/utils';

export default function({ redirect }) {
    return redirect(
        `https://id.twitch.tv/oauth2/authorize?client_id=${
            process.env.TWITCH_AUTH_CLIENT_ID
        }&response_type=token&scope=openid&force_verify=true&state=${createSessionID()}&redirect_uri=http://localhost:3000/beta/auth/validate/`
    );
}
