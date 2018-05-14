const gulp = require('gulp');
const inlinesource = require('gulp-inline-source');

gulp.task('inline-css', function() {
    return gulp
        .src('./index.html')
        .pipe(inlinesource())
        .pipe(gulp.dest('./dist'));
});
