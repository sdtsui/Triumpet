var gulp = require('gulp');
var jshint = require('gulp-jshint');
var shell = require('gulp-shell');
var istanbul = require('gulp-istanbul');

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

// gulp.task('coverTest', function (cb) {
//   gulp.src(['server/**/*.js', 'server.js'])
//     .pipe(istanbul()) // Covering files
//     .pipe(istanbul.hookRequire()) // Force `require` to return covered files
//     .on('finish', function () {
//       gulp.src(['test/*.js'])
//         .pipe(mocha())
//         .pipe(istanbul.writeReports()) // Creating the reports after tests runned
//         .on('end', cb);
//     });
// });

gulp.task('test', shell.task([
  'mocha -R spec --recursive'
]));

gulp.task('serve', shell.task([
    'nodemon server.js'
]));
