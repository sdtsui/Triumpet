var bodyParser     = require('body-parser');
var controller     = require('./routeController.js'); //Custom controllers for routes


module.exports = function(app, express) {

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  //Declare routers below
  //e.g. app.use('xxx/xxx',controller.xxx);
}
