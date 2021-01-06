const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const minifyImg = require('gulp-imagemin');
const minifyJS = require('gulp-uglify');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const runSequence = require('run-sequence');
const { dest } = require('gulp');

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
});


gulp.task('css',() =>{
    return gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', () => {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('main.js'))
        
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('html',()=>{
    return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});
gulp.task('img',()=>{
    return gulp.src('src/img/*')
    .pipe(minifyImg())
    .pipe(gulp.dest('dist/img'));
});


gulp.task('watch', () => {
    gulp.watch('src/scss/**/*.scss', ['css']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/img/**/*', ['img']);
    gulp.watch('src/**/*.html', ['html']);
});

gulp.task('delete', () => del(['dist/css', 'dist/js', 'dist/img', 'dist/**/*.html']));

gulp.task('default',()=>{
    runSequence([
        
        'html',
        'css',
        'js',
        'img',
        'browser-sync',
        'watch'
    ]);
});