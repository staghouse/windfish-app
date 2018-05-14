const notify = require('gulp-notify');

module.exports = function() {
    const args = Array.prototype.slice.call(arguments);

    notify
        .onError({
            title: 'Compile Error',
            message: '<%= error.message %>',
        })
        .apply(this, args);

    this.emit('end');
};
