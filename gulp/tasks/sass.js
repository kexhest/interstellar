'use strict';

var gulp = require('gulp');
var config = require('../config');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var handleErrors = require('../util/handleErrors');

gulp.task('sass', function() {
  return gulp.src([
        config.src + '/styles/main.scss'
    ])
    .pipe(plumber({errorHandler: handleErrors}))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(rename(config.name + '.css'))
    .pipe(gulp.dest(config.build + '/styles'));
});
