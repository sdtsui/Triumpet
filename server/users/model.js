var mongoose          = require('mongoose');
var bcrypt            = require('bcrypt-nodejs');
var Q                 = require('q');
var SALT_WORK_FACTOR  = 10;

/*
Schema for User.
*/
var UsersSchema = new mongoose.Schema({
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
  firstName   : {
    type      : String,
    required  : true,
  },
  lastName    : {
    type      : String,
    required  : true
  },
  email       : {
    type      : String,
    required  : true
  }
});

//Hash password with before saving
UsersSchema.pre('save',function(next){
  var user = this;

  //Only hash password if it has been modified or new
  if(!user.isModified('password')){
    return next();
  }

  //Generating a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err,salt){
    if(err){ //error handling
      return next(err);
    }

    //Hash password with salt
    bcrypt.hash(user.passowrd, salt, null,function(err,hash){
      if(err){ //error handling
        return next(err);
      }

      //write password to db
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});

//Export user model to controller
module.exports = mongoose.model('users',UsersSchema);
