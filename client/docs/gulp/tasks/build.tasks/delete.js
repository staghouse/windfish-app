const gulp = require('gulp');
const del = require('del');
const config = require('../../config').deleteFiles.dist;

gulp.task('delete', function(callback) {
    del(config, callback);
});
