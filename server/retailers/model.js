var mongoose          = require('mongoose');
var bcrypt            = require('bcrypt-nodejs');
var Q                 = require('q');
var CoordinatesSchema = require('./coordinates/model.js');
var ShelvesSchema     = require('./shelves/model.js');
var SALT_WORK_FACTOR  = 10;

/*
Schema for Retailer.
Contains login, contact, and map information.
*/
var RetailersSchema = new mongoose.Schema({
  username: {
    type      : String,
    required  : true,
    unique    : true,
    lowercase : true
  },
  password: {
    type      : String,
    required  : true
  },
  name        : String,
  description : String,
  phoneNumber : String,
  address     : String,
  floorPlan   : [CoordinatesSchema],    //'floorPlan' consists of an array of Coordinates.
  shelves     : [ShelvesSchema]         //'selves' consists of an array of Shelves.
});

//Compares input password against database.
RetailersSchema.methods.comparePassword = function(signin){
  var defer = Q.defer();
  var password = this.password;
  console.log('signin, password :', signin, password);
  bcrypt.compare(signin,password,function(err,isMatch){
    if(err){
      defer.reject(err);
    } else {
      defer.resolve(isMatch);
    }
  });
  return defer.promise;
};

//Hashing and salting the password.
RetailersSchema.pre('save',function(next){
  var retailer = this;

  //Only hashes the password if it has been modified or new.
  if(!retailer.isModified('password')){
    return next();
  }

  //Generating a salt.
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err,salt){
    if(err){ //error handling
      return next(err);
    }

    bcrypt.hash(retailer.password, salt, null,function(err,hash){
      if(err){
        return next(err);
      }

      //Writing to db.
      retailer.password = hash;
      retailer.salt = salt;
      next();
    });
  });
});

//Exports retailer model to controller.
module.exports = mongoose.model('retailers',RetailersSchema);
