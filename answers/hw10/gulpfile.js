'use strict';

let gulp = require('gulp');
let gulpSequence = require('gulp-sequence');
let webpack = require('webpack-stream');
let sass = require('gulp-sass');
let inline = require('gulp-inline');
let uglify = require('gulp-uglify');
let pump = require('pump');
let minifyCSS = require('gulp-minify-css');
let rename = require('gulp-rename');

gulp.task('build', gulpSequence('webpack', 'sass', ['minifyCSS', 'uglify'], 'inline'));

gulp.task('sass', function () {
  return gulp.src('src/css/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('webpack', function () {
  return gulp.src('./src/js/script.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('minifyCSS', function () {
  return gulp.src('dist/css/style.css')
    .pipe(minifyCSS())
    .pipe(rename(function (path) {
      path.basename += '.min';
      path.extname = '.css';
    }))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('uglify', function (cb) {
  return pump([
    gulp.src('dist/js/bundle.js'),
    uglify(),
    rename(function (path) {
      path.basename += '.min';
      path.extname = '.js';
    }),
    gulp.dest('dist/js/')
  ]
    , cb
  );
});

gulp.task('inline', function () {
  return gulp.src('index.html')
    .pipe(inline(
      {
        base: 'dist/'
      }))
    .pipe(gulp.dest('dist/'));
});
