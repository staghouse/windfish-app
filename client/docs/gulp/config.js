const srcFiles = 'src';
const srcAssets = srcFiles + '/assets';
const distFiles = 'dist';
const distAssets = distFiles + '/assets';

module.exports = {
    deleteFiles: {
        dist: [distFiles],
    },
    sass: {
        src: srcAssets + '/sass/',
        dest: distAssets + '/css',
        options: {
            noCache: true,
            compass: false,
            bundleExec: true,
            sourcemap: false,
        },
    },
    autoprefixer: {
        browsers: ['> 1%', 'last 2 versions', 'ie > 10'],
        cascade: true,
    },
    watch: {
        sass: srcAssets + '/sass/**/*.{sass,scss}',
    },
    optimize: {
        css: {
            src: distAssets + '/css/**/*.css',
            dest: distAssets + '/css/',
            options: {
                keepSpecialComments: 0,
            },
        },
    },
};
