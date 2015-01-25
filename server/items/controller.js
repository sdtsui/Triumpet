//Controller for /api/items
var Item     = require('./model.js');
var Retailer = require('../retailers/model.js');
var Q        = require('q');
var jwt      = require('jwt-simple');

var controller = {};

//Promisify mongoose methods
var findOneRetailer  = Q.nbind(Retailer.findOne, Retailer);
var createItem       = Q.nbind(Item.create, Item);
var findItem         = Q.nbind(Item.find, Item);


var controller = {};

controller.read = function(req,res,next){
  var username = req.params.retailer;
  findOneRetailer({username:username})
    .then(function(retailer){
      if(!retailer){
        next(new Error('Retailer doesn\'t exist'));
      } else {
        findItem({retailer_id: retailer._id})
          .then(function(item){
            console.log(item);
            res.send();
          })
      }
    })
}

controller.create = function(req,res,next){
  var username = req.params.retailer;
  findOneRetailer({username:username})
    .then(function(retailer){
      if(!retailer){
        next(new Error('Retailer doesn\'t exist'));
      } else {



      }
    });
}


module.exports = controller;
