const gulp = require('gulp');
const runSequence = require('run-sequence').use(gulp);

gulp.task('default', function(callback) {
    runSequence(
        ['delete:build', 'delete:dist'],
        ['sass'],
        ['optimize:css'],
        ['inline-css'],
        'watch',
        callback
    );
});
