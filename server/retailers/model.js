var mongoose         = require('mongoose');
var bcrypt            = require('bcrypt-nodejs');
var Q                = require('q');
var SALT_WORK_FACTOR = 10;


/*
Schema for coordinates of floorplan
e.g.: a rectangular floorplan with have 4 coordinates
e.g.: a hexagon floorplan with have 6 coordinates
*/
var Coordinates = new mongoose.Schema({
  x: Number,
  y: Number
});

/*
Schema for shelves' attributes
x and y reference coordinate of top-left corner
these four attributes are essential in order to render
them using D3.
*/
var Shelves = new mongoose.Schema({
  x: Number,
  y: Number,
  width: Number,
  height: Number
});

/*
Schema for Retailer.
Contains login info, general info, and map info.
*/
var RetailerSchema = new mongoose.Schema({
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
  description : String,
  phoneNumber : String,
  Address     : String,
  floorPlan   : [Coordinates],
  shelves     : [Shelves]
});

//Hash password with before saving
RetailerSchema.pre('save',function(next){
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
module.exports = mongoose.model('retailers',RetailerSchema);
