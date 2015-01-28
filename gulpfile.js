var gulp = require('gulp');
var jshint = require('gulp-jshint');
// var mocha = require('gulp-mocha');
//using raw shell to run mocha tests, instead of mocha.
var shell = require('gulp-shell');

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

gulp.task('test', shell.task([
  'mocha'
]))

gulp.task('default', ['lint'], function () {
    console.log('Files linted.');
});
