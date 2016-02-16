(function() {
  'use strict';

  var gulp = require('gulp');
  var nodemon = require('nodemon');
  var jshint = require('gulp-jshint');
  var stylish = require('jshint-stylish');
  var webserver = require('gulp-webserver');
  var less = require('gulp-less');
  var minify = require('gulp-minify-css');

  gulp.task('default', ['lint', 'copy-angular', 'less']);
  gulp.task('test', ['default', 'watch', 'nodemon']);

  gulp.task('webserver', function() {
    gulp.src('app')
      .pipe(webserver({
        livereload: true,
        open: true,
        port: 9090
      }));
  });

  gulp.task('copy-angular', function() {
    gulp.src(['node_modules/angular/angular.min.js', 'node_modules/angular/angular.min.js.map'])
      .pipe(gulp.dest('app/vendor/'));
  });

  gulp.task('lint', function() {
    return gulp.src(['*.js', 'app/**/*.js', '!app/**/*.spec.js', '!app/vendor/**/*.js'])
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter(stylish));
  });

  gulp.task('less', function() {
    return gulp.src('app/styles.less')
      .pipe(less({
        paths: [ 'app/**/*.less' ]
      }))
      .pipe(minify())
      .pipe(gulp.dest('app/dist/'));
  });

  gulp.task('nodemon', function (cb) {

  	var started = false;

  	return nodemon({
  		script: 'bin/www'
  	}).on('start', function () {
  		// to avoid nodemon being started multiple times
  		if (!started) {
  			cb();
  			started = true;
  		}
  	});
  });
})();
