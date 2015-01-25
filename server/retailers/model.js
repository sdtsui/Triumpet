var mongoose          = require('mongoose');
var bcrypt            = require('bcrypt-nodejs');
var Q                 = require('q');
var CoordinatesSchema = require('./coordinates/model.js');
var ShelvesSchema     = require('./shelves/model.js');
var SALT_WORK_FACTOR  = 10;

/*
Schema for Retailer.
Contains login info, general info, and map info.
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
  floorPlan   : [CoordinatesSchema],    //A floorPlan consists of an array of Coordinates
  shelves     : [ShelvesSchema]         //Selves consists of an array of Shelves
});

//Hash password with before saving
RetailersSchema.pre('save',function(next){
  var retailer = this;

  //Only hash password if it has been modified or new
  if(!retailer.isModified('password')){
    return next();
  }

  //Generating a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err,salt){
    if(err){ //error handling
      return next(err);
    }

    //Hash password with salt
    bcrypt.hash(retailer.passowrd, salt, null,function(err,hash){
      if(err){ //error handling
        return next(err);
      }

      //write password to db
      retailer.password = hash;
      retailer.salt = salt;
      next();
    });
  });
});

//Export retailer model to controller
module.exports = mongoose.model('retailers',RetailersSchema);
