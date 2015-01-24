var ejs            = require('ejs');
var bodyParser     = require('body-parser');
var retailers      = require('../retailers/controller.js'); //Custom controllers for routes

module.exports = function(app, express) {
  //Mounting middleware to app
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.engine('html',ejs.renderFile);
  app.set('view engine', 'html');
  //Serve static assets
  app.use(express.static(__dirname + '/../../client'));

  app.get('/project',function(req,res){
    res.redirect('/project');
  })
  /*
  === Routing API ===
  */

  // Retailers API
  app.put('/api/retailers/:id',retailers.update);
  app.delete('/api/retailers/:id',retailers.delete);
  app.post('/api/retailers',retailers.create);
  app.get('/api/retailers',retailers.read);

  //More API...
};


