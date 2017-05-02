var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');


/////////////////////////////////////////////////////////////////////////////////////
//
// watches for scss changes
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('scss', function () {
  return gulp.src('./assets/happster/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/happster/css'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./assets/happster/css'))
    //.on('end', done);
});

gulp.task('scss:watch', function () {
  gulp.watch('./assets/happster/scss/**/*.scss', gulp.series(['scss']));
});


/////////////////////////////////////////////////////////////////////////////////////
//
// launches a web server that serves files in the current directory
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('webserver', function() {
    gulp.src('.')
      .pipe(webserver({
          port: 3000,
          livereload: true,
          directoryListing: false,
          open: "http://localhost:3000/index.html"
      }));
});


/////////////////////////////////////////////////////////////////////////////////////
//
// launch a dev webserver and watch for scss changes
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('dev', gulp.parallel('scss','scss:watch','webserver'));










