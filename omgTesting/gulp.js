//One
var mocha = require('gulp-mocha');  
var istanbul = require('gulp-istanbul');  
var plumber = require('gulp-plumber');


var handleMochaError = function (err) {
  console.log('Mocha encountered an error, exiting with status 1');
  console.log('Error:', err.message);
  process.exit(1);
};

//deploy Ver
gulp.task('mocha', function (cb) {
  var mochaErr;

  gulp.src(['./server/**/*.js'])
    .pipe(istanbul({ includeUntested: true })) // Covering all of the files.
    .pipe(istanbul.hookRequire()) // Force `require` to return covered files. Otherwise, covered files won't get read after the test.
    .on('finish', function() {
      // Specify server specs
      gulp.src(['./test/**/*.js'], {read: false})
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


//Two
var coveralls = require('gulp-coveralls');
gulp.task('report', function(){
  gulp.src('./coverage/lcov.info')
    .pipe(coveralls());  
});
