const gulp = require('gulp');
const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const imagemin = require('gulp-imagemin');

const browserSync = require('browser-sync').create();

const css = () => {
    return src ('./src/sass/**/*.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream())
}

function imgSquash() {
	return gulp.src('src/assets/img/*')
		.pipe(imagemin({ progressive: true, optimizationLevel: 10 }))
		.pipe(gulp.dest('dist/img'))
		.pipe(browserSync.stream())
}

function fonts() {
	return gulp.src([
        'src/assets/fonts/open_sans/*.ttf',
        'src/assets/fonts/droid-serif/*.ttf'
    ])
		.pipe(gulp.dest('dist/fonts'))
}

function watch(){
    browserSync.init({
    server: {
    baseDir: './dist',
    }
    });
    
    gulp.watch('./src/sass/**/*.scss', css);
    gulp.watch('./img/*.jpg', imgSquash);
    gulp.watch('./dist/*.html').on('change', browserSync.reload);
}

exports.imgSquash = imgSquash;
exports.fonts = fonts;
exports.css = css;
exports.watch = watch;