const gulp = require('gulp');
const del = require('del');
const config = require('../../config').delete.dist;

gulp.task('delete:dist', function(callback) {
    del(config, callback);
});
