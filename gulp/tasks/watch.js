'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var config = require('../config');

gulp.task('watch', ['setWatch', 'browserSync'], function() {
  gulp.watch(config.src + '/styles/**', ['sass', browserSync.reload]);
  gulp.watch(config.src + '/images/**', ['images', browserSync.reload]);
  gulp.watch(config.src + '/fonts/**', ['fonts', browserSync.reload]);
  gulp.watch(config.src + '/**/*.html', ['html', browserSync.reload]);
});
