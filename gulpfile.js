var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');

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

gulp.task('dev', gulp.parallel( 'webserver'));


