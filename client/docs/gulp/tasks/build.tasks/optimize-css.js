var gulp = require('gulp');
var minify = require('gulp-clean-css');
var size = require('gulp-size');
var config = require('../../config').optimize.css;

gulp.task('optimize:css', function() {
    return gulp
        .src(config.src)
        .pipe(minify(config.options))
        .pipe(gulp.dest(config.dest))
        .pipe(size());
});
