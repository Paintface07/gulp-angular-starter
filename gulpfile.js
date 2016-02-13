'use strict';

var gulp = require('gulp');
var nodemon = require('nodemon');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var webserver = require('gulp-webserver')

gulp.task('default', function() {
  console.log("--- Running Default Task ---");
});

gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true,
      port: 9090
    }));
});

gulp.task('copy-angular', function() {
  gulp.src('node_modules/angular/angular.min.js')
    .pipe(gulp.dest('app/vendor/'))
});

// gulp.task('nodemon', function (cb) {
//
// 	var started = false;
//
// 	return nodemon({
// 		script: 'app.js'
// 	}).on('start', function () {
// 		// to avoid nodemon being started multiple times
// 		if (!started) {
// 			cb();
// 			started = true;
// 		}
// 	});
// });

gulp.task('lint', function() {
  return gulp.src(['*.js', 'app/**/*.js', '!app/**/*.spec.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish))
});
