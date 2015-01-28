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
        console.log('sending not okay: retailer :', retailer);
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('not okay');
      } else {
        console.log('about to next...');
        next(create(req.body));
      }
    })
    .then(function(retailer){
      console.log('retailer :', retailer);
      //Return JWT token to client after successful sign-up
      var token = jwt.encode(req.body,'secret');
      res.json({token: token});
    })
    .fail(function(error){
      console.log('should never ever get here');
      next(error);
    });
};

//signin method for retailer
controller.signin = function(req,res,next){
  //method to sign in a retailer
  var username = req.body.username;

  findOne({username:username})
    .then(function(retailer){
      if(!retailer){
        next(new Error('Retailer doesn\'t exist'));
      } else {
        return retailer.comparePassword(req.body.password)
          .then(function(verified){
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

//READ method to fetch all retailers
controller.read = function(req,res,next){
  Retailer.find({}).select('-password').exec(function(err,retailers){
    if(err){
      res.sendStatus(403);
    } else {
      res.send(retailers);
    }
  });
};

//UPDATE method to update attributes for one retailer
controller.update = function(req,res,next){
  findOne({username:req.params.username})
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
