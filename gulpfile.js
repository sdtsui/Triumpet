var gulp = require('gulp');
var eslint = require('gulp-eslint');

gulp.task('lint', function () {
    // Note: To have the process exit with an error code (1) on
    //  lint error, return the stream and pipe to failOnError last.
    return gulp.src(['client/**/*.js', '!client/project/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
  });

gulp.task('default', ['lint'], function () {
    console.log('Linted.');
});
