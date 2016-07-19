'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const eslint = require('gulp-eslint');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const minifyCss  = require('gulp-minify-css');
const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';
const gulpif = require('gulp-if');

gulp.task('styles', () => {
    gulp.src('src/less/*.less')
    .pipe(less())
    .pipe(concat('css/all.css'))
    .pipe(gulpif(isProd, sourcemaps.init()))
    .pipe(gulpif(isProd, minifyCss()))
    .pipe(gulpif(isProd, autoprefixer()))
    .pipe(gulpif(isProd,sourcemaps.write()))
    .pipe(gulp.dest('dist'))
});

gulp.task('autoprefixer', () => {
    return gulp.src('dist/all.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts', () => {
    return gulp.src('src/js/*.js')
        .pipe(concat('js/all.js'))
        .pipe(gulpif(isProd, sourcemaps.init()))
        .pipe(gulpif(isProd, uglify()))
        .pipe(gulpif(isProd, obfuscate()))
        .pipe(gulpif(isProd, sourcemaps.write()))
        .pipe(gulp.dest('dist'));
});

gulp.task('html', () => {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
});

gulp.task('img', () => {
    return gulp.src('src/img/**')
        .pipe(gulp.dest('dist/img'))
});

gulp.task('browserSync', () => {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    })
});

gulp.task('default', () =>
gulp.src('src/img/*')
    .pipe(gulpif(isProd, imagemin()))
    .pipe(gulp.dest('dist/img'))
);

gulp.task('eslint', () => {
    return gulp.src(['**/*.js', '**/*.less', '!node_modules/**'])
        .pipe(gulpif(isProd, eslint()))
});

gulp.task('default', ['styles', 'autoprefixer', 'scripts', 'html', 'img', 'browserSync', 'eslint']);