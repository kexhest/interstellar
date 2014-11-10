'use strict';

var gutil = require('gulp-util');
var prettyHrtime = require('pretty-hrtime');
var startTime = null;

module.exports = {
  start: function() {
    startTime = process.hrtime();
    gutil.log('Running', gutil.colors.green('bundle') + '...');
  },

  end: function() {
    var taskTime = process.hrtime(startTime);
    var prettyTime = prettyHrtime(taskTime);
    gutil.log('Finished', gutil.colors.green('bundle'), 'in', gutil.colors.magenta(prettyTime));
  }
};
