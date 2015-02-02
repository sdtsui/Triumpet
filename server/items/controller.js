//Controller for /api/items
var Item     = require('./model.js');
var Retailer = require('../retailers/model.js');
var Q        = require('q');
var jwt      = require('jwt-simple');

var controller = {};

//Mongoose methods, promisified. 
var findOneRetailer  = Q.nbind(Retailer.findOne, Retailer);
var createItem       = Q.nbind(Item.create, Item);
var findItem         = Q.nbind(Item.find, Item);
var findOneItem      = Q.nbind(Item.findOne, Item);

//CREATE method to create a new item.
controller.create = function(req,res,next){
  var username = req.params.retailer;
  findOneRetailer({username:username})
    .then(function(retailer){
      if(!retailer){
        next(new Error('Retailer doesn\'t exist'));
      } else {
        findOneItem({retailer_id: retailer._id, name: req.body.name})
          .then(function(item){
            if(!item){
              req.body.retailer_id = retailer._id;
              res.send(item);
              return createItem(req.body);
            } else {
              next (new Error('Item already exit'))
            }
          })
          .fail(function(error){
            next(error);
          })
      }
    });
}

//READ method to fetch all items belonging to a specific retailer.
controller.read = function(req,res,next){
  var username = req.params.retailer;
  findOneRetailer({username:username})
    .then(function(retailer){
      if(!retailer){
        next(new Error('Retailer doesn\'t exist'));
      } else {
        findItem({retailer_id: retailer._id})
          .then(function(item){
            res.send(item);
          });
      }
    });
}

//UPDATE method to update one item from one retailer.
controller.update = function(req,res,next){
  var username = req.params.retailer;
  var itemName = req.params.item;
  findOneRetailer({username:username})
    .then(function(retailer){
      if(!retailer){
        next(new Error('Retailer doesn\'t exist'));
      } else {
        findOneItem({retailer_id: retailer._id, _id: req.body._id})
          .then(function(item){
            if(!item){
              next (new Error('Item doesn\'t exit'))
            } else {
              for(var key in req.body){
                item[key] = req.body[key];
              }
              item.save();
              res.sendStatus(300);
            }
          });
      }
    });
}

//DELETE method to remove one item from a retailer.
controller.delete = function(req,res,next){
  var username = req.params.retailer;
  var itemName = req.params.item;
  findOneRetailer({username:username})
    .then(function(retailer){
      if(!retailer){
        next(new Error('Retailer doesn\'t exist'));
      } else {
        findOneItem({retailer_id: retailer._id, name: itemName})
          .then(function(item){
            if(!item){
              next (new Error('Item doesn\'t exit'))
            } else {
              item.remove();
              res.sendStatus(300);
            }
          });
      }
    });
}

module.exports = controller;
