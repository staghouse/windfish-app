module.exports = {
    /*
  ** Headers of the page
  */
    head: {
        title:
            "Windfish.io :: Windfish.io - A game tracker for The Legend of Zelda: Link's Awakening DX Randomizer",
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                name: 'og:title',
                content:
                    "Windfish.io :: Windfish.io - A game tracker for The Legend of Zelda: Link's Awakening DX Randomizer",
            },
            {
                name: 'description',
                content:
                    "Windfish is a web-based game tracker designed for streaming The Legend of Zelda: Link's Awakening DX that tracks the overworld, items and much more!",
            },
            {
                name: 'og:description',
                content:
                    "Windfish is a web-based game tracker designed for streaming The Legend of Zelda: Link's Awakening DX that tracks the overworld, items and much more!",
            },
            {
                name: 'og:image',
                content: '/images/display/master.jpg',
            },
            {
                name: 'og:url',
                content: 'https://www.windfish.io',
            },
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/images/favicons/favicon.ico',
            },
        ],
    },
    /*
  ** Customize the progress bar color
  */
    loading: { color: '#3B8070' },
    /*
  ** Build configuration
  */
    build: {
        /*
    ** Run ESLint on save
    */
        extend(config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/,
                });
            }
        },
    },
    modules: [/*'~/io', */ '@nuxtjs/google-analytics'],

    'google-analytics': {
        id: 'UA-119957645-1',
    },
};
