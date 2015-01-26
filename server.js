//Entry point for server
var app      = require('./server/app.js');
var port     = process.env.PORT || 8080;

app.listen(port);
console.log('Listening on Port '+port+'.....')
