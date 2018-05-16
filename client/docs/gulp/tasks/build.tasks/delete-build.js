const gulp = require('gulp');
const del = require('del');
const config = require('../../config').delete.build;

gulp.task('delete:build', function(callback) {
    del(config, callback);
});
