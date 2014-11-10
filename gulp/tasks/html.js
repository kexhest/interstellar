'use strict';

var gulp = require('gulp');
var config = require('../config');
var changed = require('gulp-changed');

gulp.task('html', function() {
  return gulp.src(config.src + '/**/*.html')
    .pipe(changed(config.build))
    .pipe(gulp.dest(config.build));
});
