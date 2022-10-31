var gulp = require('gulp'),
    { series, parallel } = require('gulp')

// gulp 플러그인 호출
const sass = require('gulp-sass')(require('sass'));
var uglify      = require('gulp-uglify'),
    sourcemaps  = require('gulp-sourcemaps'), // sourcemaps 호출
    webserver        = require('gulp-webserver');

// var src  = 'project/src';
var dist = './dist';
var paths = {
    scss : './scss/**/*.scss'
};

var scssOptions = {
    outputStyle: 'expanded',
    indentType: 'tab',
    indentWidth: 1,
    precision: 6,
    sourceComments: true
}

gulp.task('scss', function() {
    return gulp
    .src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass(scssOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dist))
    // .pipe(browserSync.reload({ stream: true }));
})

gulp.task('webserver', function() {
    gulp.src('./')
    .pipe(webserver({
        livereload: true,
        open: false,
        port: 8888
    }))
})

gulp.task('watch', function() {
    gulp.watch(paths.scss, gulp.series(['scss']));
});

gulp.task('default', gulp.parallel(['webserver'],  gulp.series(['scss', 'watch'])));