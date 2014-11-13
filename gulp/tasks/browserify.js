'use strict';

var gulp = require('gulp');
var config = require('../config');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var bundleLogger = require('../util/bundleLogger');
var handleErrors = require('../util/handleErrors');

gulp.task('browserify', ['jshint'], function() {
  var bundler = browserify({
    cache: {},
    packageCache: {},
    fullPaths: false,
    entries: [config.src + '/scripts/index.js'],
    debug: false
  });

  var bundle = function() {
    bundleLogger.start();

    return bundler
      .transform({
        global: true
      }, 'uglifyify')
      .bundle()
      .on('error', handleErrors)
      .pipe(source(config.name + '.js'))
      .pipe(gulp.dest(config.build + '/scripts/'))
      .pipe(browserSync.reload({stream: true, once: true}))
      .on('end', bundleLogger.end);
  };

  if (global.isWatching) {
    bundler = watchify(bundler);

    bundler.on('update', bundle);
  }

  return bundle();
});
