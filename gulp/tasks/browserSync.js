'use strict';

var gulp = require('gulp');
var config = require('../config');
var browserSync = require('browser-sync');

gulp.task('browserSync', ['build'], function() {
  browserSync({
    server: {
        baseDir: config.build
    }
  });
});
