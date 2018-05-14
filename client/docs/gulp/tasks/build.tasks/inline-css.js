const gulp = require('gulp');
const inlinesource = require('gulp-inline-source');

gulp.task('inline-css', function() {
    let options = { compress: false };

    return gulp
        .src('index.html')
        .pipe(inlinesource(options))
        .pipe(gulp.dest('./dist'));
});
