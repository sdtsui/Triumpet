var gulp = require('gulp');
var jshint = require('gulp-jshint');
var shell = require('gulp-shell');
var exec = require('child_process').exec;

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
});

gulp.task('serve', shell.task([
    'nodemon server.js'
]));

//requires:
//  -server
//  -selenium
gulp.task('test', shell.task([
  'mocha -R spec $(find test/e2e/userTestSpec.js)',
  'mocha -R spec $(find test/e2e/retailerTestSpec.js)',
  'mocha -R spec $(find test/e2e/itemTestSpec.js)',
  'mocha -R spec $(find test/unit/db/dbSpec.js)'
]));
