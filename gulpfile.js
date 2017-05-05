var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	htmlmin = require('gulp-htmlmin'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: './public'
		}
	});
});

gulp.task('compile-minify-scss', function() {
	return gulp.src('./src/sass/*.scss')
	.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
	.pipe(autoprefixer({ cascade: false }))
	.pipe(gulp.dest('./public/css'))
	.pipe(browserSync.stream());
});

gulp.task('minify-js', function() {
	gulp.src('./src/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('./public/js'))
	.pipe(browserSync.stream()); //JS AUTO RELOAD
});

gulp.task('minify-html', function() {
	return gulp.src('./src/*.html')
	.pipe(htmlmin({ collapseWhitespace: true }))
	.pipe(gulp.dest('./public'))
	.pipe(browserSync.stream());
});

gulp.task('watch', function() {
	gulp.watch('./src/sass/**/*.scss', ['compile-minify-scss']);
	gulp.watch('./src/js/**/*.js', ['minify-js']);
	gulp.watch('./src/**/*.html', ['minify-html']);
});

gulp.task('default', ['browserSync', 'minify-html', 'compile-minify-scss', 'minify-js', 'watch']);
