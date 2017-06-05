'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var gutil = require("gulp-util");
var shell = require('gulp-shell')
var jshint = require('gulp-jshint');

var del = require('del');
var merge2 = require('merge2');
var runSequence = require('run-sequence');

var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var webpackConfig_bootstrap = require('./webpack.bootstrap.config.js');
var webpackConfig_demo = require('./demo/webpack.config.js');

var paths = {
    build: 'build',
    locale: 'build/i18n'
};

// react-puf build
gulp.task('clean.js', function() {
    return del([paths.build + '/react-puf.js', paths.build + '/react-puf.min.js', paths.build + '/react-puf.js.map']);
});

gulp.task('build.js', ['clean.js'], function (callback) {
    webpack(webpackConfig, function(err, stats) {
		if(err) throw new gutil.PluginError('build.js', err);
		gutil.log('[build.js]', stats.toString({
			colors: true
		}));
		callback();

        var rename = require('gulp-rename');
        return gulp.src(paths.build + '/react-puf.js')
                .pipe(uglify())
                .pipe(rename({extname: '.min.js'}))
                .pipe(gulp.dest(paths.build));
	});
});

// demo build
gulp.task('clean.demo', function() {
    return del('demo/build/*.bundle.js');
});

gulp.task('build.demo', ['clean.demo'], function(callback) {
    webpack(webpackConfig_demo, function(err, stats) {
		if(err) throw new gutil.PluginError('build.demo', err);
		gutil.log('[build.demo]', stats.toString({
			colors: true
		}));
		callback();
	});
});

// locale(i18n)
gulp.task('clean.locale', function() {
    return del(paths.locale + '/*.js');
});

gulp.task('build.locale', ['clean.locale'], function() {
    var rename = require('gulp-rename');
    return gulp.src('src/i18n/*.js')
            .pipe(gulp.dest(paths.locale))
            .pipe(uglify())
            .pipe(rename({extname: '.min.js'}))
            .pipe(gulp.dest(paths.locale));
});

// react-puf(bootstrap) build
gulp.task('clean.bootstrap', function() {
    return del([paths.build + '/react-bootstrap-puf.js', paths.build + '/react-bootstrap-puf.min.js', paths.build + '/react-bootstrap-puf.js.map']);
});

gulp.task('build.bootstrap', ['clean.bootstrap'], function (callback) {
    webpack(webpackConfig_bootstrap, function(err, stats) {
		if(err) throw new gutil.PluginError('build.bootstrap', err);
		gutil.log('[build.bootstrap]', stats.toString({
			colors: true
		}));
		callback();

        var rename = require('gulp-rename');
        return gulp.src(paths.build + '/react-bootstrap-puf.js')
                .pipe(uglify())
                .pipe(rename({extname: '.min.js'}))
                .pipe(gulp.dest(paths.build));
	});
});

// docs
gulp.task('clean.docs', function() {
    return del('esdoc');
});

gulp.task('build.docs', ['clean.docs'], shell.task('npm run docs'));

// lint
gulp.task('lint', function() {
  return gulp.src('src/**/*.js')
             .pipe(jshint())
             .pipe(jshint.reporter('jshint-stylish'));
});

// watch
gulp.task('watch', ['build.js'], function() {
    gulp.watch('src/**/*.js', ['build.js']);
});

gulp.task('watch.demo', ['build.demo'], function() {
    gulp.watch(['demo/**/*.js', '!demo/build/*.js'], ['build.demo']);
});

// default
gulp.task('default', ['build.js', 'build.demo', 'build.locale', 'build.docs']);