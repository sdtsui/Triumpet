var gulp = require('gulp');
var jshint = require('gulp-jshint');
var shell = require('gulp-shell');
var exec = require('child_process').exec;
var mocha = require('gulp-mocha');  
var istanbul = require('gulp-istanbul');  
var plumber = require('gulp-plumber');

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


// //blog Ver
// gulp.task('mocha', function (cb) {  
//   var mochaErr;
//   // Track src files that should be covered
//   gulp.src('./server/**/*.js')
//     .pipe(istanbul({ includeUntested: true })) // Covering files
//     .pipe(istanbul.hookRequire()) // Force `require` to return covered files
//     .on('finish', function() {
//       // Specify server specs
//       gulp.src(paths.serverSpec, {read: false})
//         .pipe(plumber())
//         .pipe(mocha({
//           reporter: 'spec',
//           timeout: 20000
//         }))
//         // Write reports to Istanbul
//         .pipe(istanbul.writeReports())
//     });
// });

var handleMochaError = function (err) {
  console.log('Mocha encountered an error, exiting with status 1');
  console.log('Error:', err.message);
  process.exit(1);
};
//deploy Ver
gulp.task('mocha', function (cb) {
  var mochaErr;
  // Track src files that should be covered
  gulp.src(['./server/**/*.js'])
    .pipe(istanbul({ includeUntested: true })) // Covering files
    .pipe(istanbul.hookRequire()) // Force `require` to return covered files
    .on('finish', function() {
      // Specify server specs
      gulp.src(['./test/unit/db/dbSpec.js'], {read: false})
        .pipe(plumber())
        .pipe(mocha({
          reporter: 'spec',
          timeout: 20000
        }))
        /**
         * Keep track of latest error on Mocha. Because a failed test counts
         * as an error, the process should not be exited until end of tests.
         */
        .on('error', function(err) {
          /**
           * This intermediate log is useful for when mocha crashes (as opposed
           * to a test failing). Can be commented out if needed.
           */
          console.error('ERROR:', err.message);
          console.error('Stack:', err.stack);
          mochaErr = err;
        })
        // Write reports to Istanbul
        .pipe(istanbul.writeReports())
        /**
         * The methods below are a hack to get gulp to exit after mocha tests
         * finish. Without them, `gulp mocha` doesn't exit and Travis
         * never finishes running the tests.
         */
        .on('end', function () {
          if (mochaErr) return handleMochaError(mochaErr);
          // Force mocha to exit, because gulp-mocha is stupid.
          process.exit();
        });
    });
});