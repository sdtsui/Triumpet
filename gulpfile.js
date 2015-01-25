var protractor = require("gulp-protractor").protractor;
var webdriver_standalone = require("gulp-protractor").webdriver_standalone;
gulp.task('webdriver_standalone', webdriver_standalone);

gulp.src(["./src/tests/*.js"])
    .pipe(protractor({
        configFile: "test/protractor.config.js",
        args: ['--baseUrl', 'http://127.0.0.1:8000']
    })) 
    .on('error', function(e) { throw e })