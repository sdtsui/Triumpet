//Controller for /api/retailers
var Retailer = require('./model.js');
var Q        = require('q');
var jwt      = require('jwt-simple');

var controller = {};

//Promisify mongoose methods
var findOne  = Q.nbind(Retailer.findOne, Retailer);
var create   = Q.nbind(Retailer.create, Retailer);

//CREATE method to create a new retailer
controller.create = function(req,res,next){
  var username = req.body.username;

  findOne({username:username})
    .then(function(retailer){
      if(retailer){
        next(new Error('Retailer already exist'));
      } else {
        return create(req.body);
      }
    })
    .then(function(retailer){
      //Return JWT token to client after successful sign-up
      var token = jwt.encode(req.body,'secret');
      res.json({token: token});
    })
    .fail(function(error){
      next(error);
    });
};

//READ method to fetch all retailers
controller.read = function(req,res,next){
  Retailer.find({},function(err,retailers){
    if(err){
      res.sendStatus(403);
    } else {
      res.send(retailers);
    }
  });
};

//UPDATE method to update attributes for one retailer
controller.update = function(req,res,next){
  findOne({_id:req.params.id})
    .then(function(retailer){
      if(!retailer){
        next(new Error('Retailer does not exist'));
      } else {
        //Update all attributes from req.body
        for (var attr in req.body){
          retailer[attr] = req.body[attr];
        }
        retailer.save();
        res.sendStatus(300);
      }
    })
    .fail(function(error){
      next(error);
    });
};

//DELETE method to remove retailer
controller.delete = function(req,res,next){
  findOne({_id:req.params.id})
    .then(function(retailer){
      if(!retailer){
        next(new Error('Retailer does not exist'));
      } else {
        retailer.remove();
        res.sendStatus(300);
      }
    })
    .fail(function(error){
      next(error);
    });
};

module.exports = controller;
