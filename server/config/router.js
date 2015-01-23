var bodyParser     = require('body-parser');
var retailers     = require('../retailers/controller.js'); //Custom controllers for routes

module.exports = function(app, express) {

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  //routing CRUD for retailers API to controllers
  app.post('/api/retailers',retailers.create);
  app.get('/api/retailers',retailers.read);
  app.put('api/retailers/:id',retailers.update);
  app.delete('api/retailers/:id',retailers.delete);
}


