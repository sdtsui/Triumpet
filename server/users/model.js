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
  },
  salt        : String
});

//Compares input password against database.
UsersSchema.methods.comparePassword = function(signin){
  //Promisify method
  var defer = Q.defer();
  var password = this.password;
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
UsersSchema.pre('save',function(next){
  var user = this;

  //Only hashes password if it is new, or modified.
  if(!user.isModified('password')){
    return next();
  }

  //Generating a salt.
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err,salt){
    if(err){ //error handling
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, function(err,hash){
      if(err){
        return next(err);
      }

      //Writing to db.
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});

//Export user model to controller.
module.exports = mongoose.model('users',UsersSchema);
