var Retailer = require('./model.js');
var Q        = require('q');
var jwt      = require('jwt-simple');


//promisisy
var findOne  = Q.nbind(Retailer.findOne, Retailer);
var create   = Q.nbind(Retailer.create, Retailer);
//declare a router
var controller = {};

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
      var token = jwt.encode(req.body,'secret');
      res.json({token: token});
    })
    .fail(function(error){
      next(error);
    })
};
controller.read = function(req,res,next){
  Retailer.find({},function(err,retailers){
    if(err){
      //error handling
    } else {
      res.send(retailers);
    }
  })
};
controller.update = function(req,res,next){
  findOne({_id:req.params.id})
    .then(function(retailer){
      if(!retailer){
        next(new Error('Retailer does not exist'));
      } else {
        for (var attr in req.body){
          retailer[attr] = req.body[attr];
        }
        retailer.save();
        res.sendStatus(300);
      }
    })
    .fail(function(error){
      next(error);
    })
};
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
    })
};


module.exports = controller;
