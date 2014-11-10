'use strict';

var gulp = require('gulp');
var config = require('../config');
var jshint = require('gulp-jshint');

gulp.task('jshint', function() {
  return gulp.src([
    config.src + '/scripts/**/*.js'
  ])
  .pipe(jshint())
  .pipe(jshint.reporter(require('jshint-stylish')));
});
