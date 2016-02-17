(function () {
    'use strict';

    var gulp = require('gulp');
    var nodemon = require('nodemon');
    var jshint = require('gulp-jshint');
    var stylish = require('jshint-stylish');
    var webserver = require('gulp-webserver');
    var less = require('gulp-less');
    var minify = require('gulp-minify-css');

    // default build - for deployment
    gulp.task('default', ['lint', 'copy-static-deps', 'less']);

    // test build - for testing locally
    gulp.task('test', ['default', 'nodemon']);

    // copy-static-deps - copies npm libraries we need to deploy
    gulp.task('copy-static-deps', ['copy-angular', 'copy-ui-router', 'copy-angular-aria', 'copy-bootstrap']);

    // *** Copy angular static dependency from release folder ***
    gulp.task('copy-angular', function () {
        gulp.src(['node_modules/angular/angular.min.js', 'node_modules/angular/angular.min.js.map'])
            .pipe(gulp.dest('app/dist/vendor/angular/'));
    });

    // *** Copy ui-router static dependency from release folder ***
    gulp.task('copy-ui-router', function () {
        gulp.src(['node_modules/angular-ui-router/release/angular-ui-router.min.js'])
            .pipe(gulp.dest('app/dist/vendor/angular-ui-router/'));
    });

    // *** Copy angular-aria static dependency from release folder ***
    gulp.task('copy-angular-aria', function () {
        gulp.src(['node_modules/angular-aria/angular-aria.min.js',
            'node_modules/angular-aria/angular-aria.min.js.map'])
            .pipe(gulp.dest('app/dist/vendor/angular-aria/'));
    });

    // *** Copy angular-bootstrap static dependency from release folder ***
    gulp.task('copy-bootstrap', function () {
        gulp.src([
            'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css',
            'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
            'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js'])
            .pipe(gulp.dest('app/dist/vendor/angular-bootstrap/'));
    });

    // *** Run JSHint ***
    gulp.task('lint', function () {
        return gulp.src(['*.js', 'app/**/*.js', '!app/**/*.spec.js', '!app/dist/**/*.js'])
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter(stylish));
    });

    // *** Run LESS compilation ***
    gulp.task('less', function () {
        return gulp.src('app/styles.less')
            .pipe(less({
                paths: ['app/**/*.less']
            }))
            .pipe(minify())
            .pipe(gulp.dest('app/dist/'));
    });

    // *** Start app with change detection on server ***
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

    gulp.task('webserver', function () {
        gulp.src('app')
            .pipe(webserver({
                livereload: true,
                open: true,
                port: 9090
            }));
    });
})();
