var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('lint', function() {
  return gulp.src([
    '../*.js',//Triumpet directory
    '**/*.js',//base path is client
    '../server/**/*.js',
    '../test/**/*.js'
    ], {base: 'client/'})
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('default', ['lint'], function () {
    console.log('Linted.');
});
