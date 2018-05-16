const srcFiles = 'src';
const srcAssets = srcFiles + '/assets';
const buildFiles = 'build';
const buildAssets = buildFiles + '/assets';
const distFiles = 'dist';
const distAssets = distFiles + '/assets';

module.exports = {
    delete: {
        build: [buildFiles],
        dist: [distFiles],
    },
    sass: {
        src: srcAssets + '/sass/',
        dest: buildAssets + '/css',
        options: {
            noCache: true,
            compass: false,
            bundleExec: true,
            sourcemap: true,
        },
    },
    autoprefixer: {
        browsers: ['> 1%', 'last 2 versions'],
        cascade: true,
    },
    watch: {
        sass: srcAssets + '/sass/**/*.{sass,scss}',
    },
    optimize: {
        css: {
            src: buildAssets + '/css/**/*.css',
            dest: buildAssets + '/css/',
            options: {
                keepSpecialComments: 0,
            },
        },
    },
};
