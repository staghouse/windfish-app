const gulp = require('gulp');
const sass = require('gulp-ruby-sass');
const gulpFilter = require('gulp-filter');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const config = require('../../config');
const handleErrors = require('../../util/handle-errors');

gulp.task('sass', function() {
    const sassConfig = config.sass.options;

    const filter = gulpFilter(['*.css', '!*.map']);

    return sass(config.sass.src, sassConfig)
        .on('error', handleErrors)
        .pipe(sourcemaps.init())
        .pipe(autoprefixer(config.autoprefixer))
        .pipe(filter)
        .pipe(sourcemaps.write('.', { includeContent: false }))
        .pipe(filter.restore())
        .pipe(gulp.dest(config.sass.dest));
});
