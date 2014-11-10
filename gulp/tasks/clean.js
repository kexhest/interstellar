'use strict';

var gulp = require('gulp');
var config = require('../config');
var del = require('del');

gulp.task('clean', del.bind(null, [config.build]));
