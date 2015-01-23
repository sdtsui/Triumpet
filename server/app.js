var express        = require('express');
var mongoose       = require('mongoose');

var app = express();

//connect to mongo
mongoose.connect('mongodb://localhost/triumpet');

//configure server with all middleware and routing
require('./config/router.js')(app, express);

//export our app required by server.js
module.exports = app;
