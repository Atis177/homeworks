var gulp       = require('gulp'),
	less         = require('gulp-less'),
	browserSync  = require('browser-sync'),
	concat       = require('gulp-concat'),
	cssnano      = require('gulp-cssnano'),
	rename       = require('gulp-rename'),
	del          = require('del'),
	imagemin     = require('gulp-imagemin'),
	pngquant     = require('imagemin-pngquant'),
	cache        = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var path = require('path');
var inject = require('gulp-inject');

gulp.task('less', function(){
	return gulp.src('app/less/**/*.less')
		.pipe(less())
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('css-libs', ['less'], function() {
	return gulp.src('app/css/*.css')
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('app/css'));
});

gulp.task('watch', ['browser-sync', 'css-libs'], function() {
	gulp.watch('app/less/**/*.less', ['less']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img'));
});

gulp.task('clear', function (callback) {
	return cache.clearAll();
});

gulp.task("svgstore", function() {
	gulp
		.src("app/img/svg/*.svg")
		.pipe(svgstore({
			inlineSvg: true,
			prefix: ""
		}))
		.pipe(gulp.dest("dist/img/svg"));
});

gulp.task('default', ['watch']);

gulp.task('prod', ['clean', 'img', 'less'], function() {

	var buildCss = gulp.src([
			'app/css/main.css',
			'app/css/libs.min.css'
		])
		.pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src('app/js/**/*')
		.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));

});
