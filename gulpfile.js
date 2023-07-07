const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');

function serve() {
    // Serve files from the root of this project
    browserSync.init({
      server: {
        baseDir: "dist"
      }
    });
    
    gulp.watch("src/*.html", gulp.series(html)).on("change", browserSync.reload);
    gulp.watch("src/scss/**/*.scss", gulp.series(css)).on("change", browserSync.reload);
    gulp.watch("src/scripts/**/*.js", gulp.series(javascript)).on("change", browserSync.reload);
    gulp.watch("src/icons/*", gulp.series(icons)).on("change", browserSync.reload);
    gulp.watch("src/images/*", gulp.series(images)).on("change", browserSync.reload);
    gulp.watch("src/fonts/*", gulp.series(fonts)).on("change", browserSync.reload);
}

function javascript() {
  return gulp.src('src/scripts/**/*.js')
      .pipe(sourcemaps.init())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('dist/scripts'));
}

function css() {
  return gulp.src('src/scss/style.scss')
      .pipe(sass({ outputStyle: 'compressed' }))
      .pipe(postcss([ autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }) ]))
      .pipe(cleanCSS())
      .pipe(gulp.dest('dist/styles'))
}

function html() {
  return gulp.src('src/*.html')
      .pipe(gulp.dest('dist'))
}

function fonts() {
  return gulp.src('src/fonts/*')
      .pipe(gulp.dest('dist/fonts'))
}

function icons() {
  return gulp.src('src/icons/*')
      .pipe(gulp.dest('dist/icons'))
}

function images() {
  return gulp.src('src/images/*')
      .pipe(gulp.dest('dist/images'))
}

exports.serve = gulp.series(serve);

/*
* gulp serve - start watcher
* */