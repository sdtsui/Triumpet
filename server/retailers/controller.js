//Controller for /api/retailers
var Retailer = require('./model.js');
var Q        = require('q');
var jwt      = require('jwt-simple');

var controller = {};

//Mongoose methods, promisified. 
var findOne  = Q.nbind(Retailer.findOne, Retailer);
var create   = Q.nbind(Retailer.create, Retailer);

//CREATE method to create a new retailer.
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
      //Returns JWT to client after a successful sign-up.
      var token = jwt.encode(req.body,'secret');
      res.json({token: token});
    })
    .fail(function(error){
      next(error);
    });
};

//Signs in a retailer.
controller.signin = function(req,res,next){
  var username = req.body.username;
  console.log('req.body.username, req.body.password',req.body.username, req.body.password);
  findOne({username:username})
    .then(function(retailer){
      if(!retailer){
        next(new Error('Retailer doesn\'t exist'));
      } else {
        console.log('entering else');
        return retailer.comparePassword(req.body.password)
          .then(function(verified){
            console.log('entering else');
            if(verified){
               //Return JWT token to client after successful sign-in
              var token = jwt.encode(req.body,'secret');
              res.json({token: token});
            } else {
              return next(new Error('Sign-in failed'));
            }
          })
      }
    })
    .fail(function(err){
      next(err);
    })
};

//READ method to fetch all retailers.
controller.read = function(req,res,next){
  Retailer.find({}).select('-password').exec(function(err,retailers){
    if(err){
      res.sendStatus(403);
    } else {
      res.send(retailers);
    }
  });
};

//READONE method to fetch a single retailer.
controller.readOne = function(req,res,next){
  findOne({username:req.params.username})
    .then(function(retailer){
      if(!retailer){
        next(new Error('Retailer doesn\'t exist'));
      } else {
        retailer.password = undefined;
        res.send(retailer);
      }
    })
    .fail(function(err){
      next(err);
    })
};

//UPDATE method to update attributes for one retailer.
controller.update = function(req,res,next){
  findOne({username:req.params.username})
    .then(function(retailer){
      if(!retailer){
        next(new Error('Retailer does not exist'));
      } else {
        //Updates all of a retailer's attributes using data in req.body.
        for (var attr in req.body){
          retailer[attr] = req.body[attr];
        }
        retailer.save();
        console.log(req.body, retailer)
        res.sendStatus(300);
      }
    })
    .fail(function(error){
      next(error);
    });
};

//DELETE method to remove a retailer.
controller.delete = function(req,res,next){
  findOne({username:req.params.username})
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
