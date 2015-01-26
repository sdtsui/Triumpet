var ejs            = require('ejs');
var bodyParser     = require('body-parser');
var retailers      = require('../retailers/controller.js'); //Custom controllers for routes
var items          = require('../items/controller.js'); //Custom controllers for routes
module.exports = function(app, express) {
  //Mounting middleware to app
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.engine('html',ejs.renderFile);
  app.set('view engine', 'html');

  //Serve static assets
  app.use(express.static(__dirname + '/../../client'));

  //Route to project landing page
  app.get('/project',function(req,res){
    res.redirect('/project');
  })
  /*
  === Routing API ===
  */

  // Retailers API
  app.post('/api/retailers',retailers.create);
  app.get('/api/retailers',retailers.read);
  app.put('/api/retailers/:username',retailers.update);
  app.delete('/api/retailers/:username',retailers.delete);

  // Items API
  app.post('/api/items/:retailer', items.create);
  app.get('/api/items/:retailer', items.read);
  app.put('/api/items/:retailer/:item', items.update);
  app.delete('/api/items/:retailer/:item',items.delete);

  //More API...
};


