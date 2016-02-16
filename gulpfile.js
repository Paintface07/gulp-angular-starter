(function() {
  'use strict';

  var gulp = require('gulp');
  var nodemon = require('nodemon');
  var jshint = require('gulp-jshint');
  var stylish = require('jshint-stylish');
  var webserver = require('gulp-webserver');

  gulp.task('default', ['lint', 'copy-angular']);
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

  gulp.task('watch', function() {
    gulp.watch('app/*', ['lint']);
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
