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
var webpackConfig_examples = require('./examples/webpack.config.js');

var paths = {
    build: 'dist',
    locale: 'dist/i18n'
};

// react-kendo-ui build
gulp.task('clean.js', function() {
    return del([paths.build + '/react-kendo-ui.js', paths.build + '/react-kendo-ui.min.js', paths.build + '/react-kendo-ui.js.map']);
});

gulp.task('build.js', ['clean.js'], function (callback) {
    webpack(webpackConfig, function(err, stats) {
		if(err) throw new gutil.PluginError('build.js', err);
		gutil.log('[build.js]', stats.toString({
			colors: true
		}));
		callback();

        var rename = require('gulp-rename');
        return gulp.src(paths.build + '/react-kendo-ui.js')
                .pipe(uglify())
                .pipe(rename({extname: '.min.js'}))
                .pipe(gulp.dest(paths.build));
	});
});

// examples build
gulp.task('clean.examples', function() {
    return del('examples/build/*.bundle.js');
});

gulp.task('build.examples', ['clean.examples'], function(callback) {
    webpack(webpackConfig_examples, function(err, stats) {
		if(err) throw new gutil.PluginError('build.examples', err);
		gutil.log('[build.examples]', stats.toString({
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

gulp.task('watch.examples', ['build.examples'], function() {
    gulp.watch(['examples/**/*.js', '!examples/build/*.js'], ['build.examples']);
});

// default
gulp.task('default', ['build.js', 'build.examples', 'build.locale', 'build.docs']);