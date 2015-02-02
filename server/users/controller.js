//Controller for /api/users
var User = require('./model.js');
var Q        = require('q');
var jwt      = require('jwt-simple');

var controller = {};

//Mongoose methods, promisified. 
var findOne  = Q.nbind(User.findOne, User);
var create   = Q.nbind(User.create, User);

//CREATE method to create a new user.
controller.create = function(req,res,next){
  var username = req.body.username;

  findOne({username:username})
    .then(function(user){
      if(user){
        next(new Error('User already exist'));
      } else {
        return create(req.body);
      }
    })
    .then(function(user){
      //Returns JWT to client after a successful sign-up.
      var token = jwt.encode(req.body,'secret');
      res.json({token: token});
    })
    .fail(function(error){
      next(error);
    });
};

//Signs in a user.
controller.signin = function(req,res,next){
  var username = req.body.username;

  findOne({username:username})
    .then(function(user){
      if(!user){
        next(new Error('User doesn\'t exist'));
      } else {
        return user.comparePassword(req.body.password)
          .then(function(verified){
            if(verified){
               //Returns JWT to client after a successful sign-in.
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

//UPDATE method to update attributes for one User.
controller.update = function(req,res,next){
  findOne({username:req.params.username})
    .then(function(user){
      if(!user){
        next(new Error('User does not exist'));
      } else {
        //Update all attributes from req.body.
        for (var attr in req.body){
          user[attr] = req.body[attr];
        }
        user.save();
        res.sendStatus(300);
      }
    })
    .fail(function(error){
      next(error);
    });
};

//DELETE method to remove a user.
controller.delete = function(req,res,next){
  findOne({username:req.params.username})
    .then(function(user){
      if(!user){
        next(new Error('User does not exist'));
      } else {
        user.remove();
        res.sendStatus(300);
      }
    })
    .fail(function(error){
      next(error);
    });
};

module.exports = controller;
