const gulp = require('gulp');
const config = require('../../config').watch;
const watch = require('gulp-watch');
const runSequence = require('run-sequence').use(gulp);

gulp.task('watch', function() {
    gulp.watch(config.sass, ['sass']);
});
