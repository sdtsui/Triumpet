var chai = require('chai');
var expect = chai.expect;
var should = chai.should;

var mongoose    = require('mongoose');
var Q           = require('q');
var User        = require('../../../server/users/model.js');
var q_findOne     = Q.nbind(User.findOne, User);
var q_create      = Q.nbind(User.create, User);
var q_find      = Q.nbind(User.find, User);

var dbPath      = process.env.dbPath || 'mongodb://localhost/triumpet';
var db = mongoose.connect(dbPath);

describe('Dummy DB Test', function(){
  it ('run server tests', function(){
    expect('dummy test').to.be.a('string');
  });
});

describe('users CRUD tests', function(){

  describe('C: Create operations', function(){
    // beforeEach();
    afterEach(function(done){
      q_findOne({username: 'phillip'})
        .then(function(user){
          if(user){
            user.remove();
            done();
          } else {
            done();
          }
        },function(err){
          done(err);
        });
    });

    it('Should successfully create a unique user', function(done){
      var newUser = {
        "email"     : "Phillip@triumpet.com",
        "firstName" : "phillip",
        "lastName"  : "phillip",
        "password"  : "phillip",
        "username"  : "phillip"
      };

      q_create(newUser)
        .then(function(){
          console.log('success create')
          expect('pass').to.equal('pass');
          done();
        },function(err){
          console.log('failure create');
          expect('fail').to.not.equal('fail');
          done(err);
        });
    }) //create unique user

    it('Should not allow creation of users that already exist', function(done){
      var newUser = {
        "email"     : "Phillip@triumpet.com",
        "firstName" : "phillip",
        "lastName"  : "phillip",
        "password"  : "phillip",
        "username"  : "phillip"
      };
      //first insert should pass
      q_create(newUser)
        .then(function(){
          expect('pass').to.equal('pass');
        },function(err){
          done(err);
        });

      //2nd insert should fail, catch error and pass.
      q_create(newUser)
        .then(function(){
          done(new Error('Error : db should already have a duplicate of this user..'));
        })
        .catch(function(err){
          done();
        });

    });

  }); // C


  describe('R: Read operations : ', function(){
    beforeEach(function(done){
      var newUsers = [
        {
        "email"     : "Phillip@triumpet.com",
        "firstName" : "phillip4",
        "lastName"  : "phillip4",
        "password"  : "phillip4",
        "username"  : "phillip4"
        },
        {
        "email"     : "Phillip@triumpet.com",
        "firstName" : "phillip2",
        "lastName"  : "phillip2",
        "password"  : "phillip2",
        "username"  : "phillip2"
        },
        {
        "email"     : "Phillip@triumpet.com",
        "firstName" : "phillip3",
        "lastName"  : "phillip3",
        "password"  : "phillip3",
        "username"  : "phillip3"
        }
      ];

      q_create(newUsers)
        .then(function(){
          done();
        })
        .catch(function(err){
          done();
        });
    });

    afterEach(function(done){
      q_findOne({username: 'phillip4'})
        .then(function(user){
          if(user){
            user.remove();
            done();
          } else {
            done();
          }
        },function(err){
          done(err);
        });
      q_findOne({username: 'phillip2'})
        .then(function(user){
          if(user){
            user.remove();
            done();
          } else {
            done();
          }
        },function(err){
          done(err);
        });
      q_findOne({username: 'phillip3'})
        .then(function(user){
          if(user){
            user.remove();
            done();
          } else {
            done();
          }
        },function(err){
          done(err);
        });
      // q_findOne({username: 'phillip1'})
      //   .then(function(user){
      //     if(user){
      //       user.remove();
      //       done();
      //     } else {
      //       done();
      //     }
      //   },function(err){
      //     done(err);
      //   });
      // q_findOne({username: 'phillip22'})
      //   .then(function(user){
      //     if(user){
      //       user.remove();
      //       done();
      //     } else {
      //       done();
      //     }
      //   },function(err){
      //     done(err);
      //   });

    });

    it('Returns all inserted elements', function(){
      q_find({})
        .then(function(users){
          users.length === 3 ? done() : done(new Error('Database does not have 3 elements'));
        });
    });

    it('Successfully queries a single element', function(){
      q_findOne({username: 'phillip3'})
        .then(function(users){
          (users.length === 1 && users['lastname'] && users['firstname'] && users['salt']) ?
          done() : done(new Error('User missing one of: firstname, lastname, or salt'));
        });
    });

    it('Fails when querying for a non-existent user', function(){
      q_find({username: 'AAAlkjasdklfjslkajXXBOOPxYY'})
        .then(function(users){
          //OPEN ISSUE
          // console.log(!!users);
          // if(!users){console.log('should be falsy')};
          if(users.length === 0){
            done()
          }else{
            done(new Error('Response is something other than empty array, for non-existent user.'))
          }
        })
        .catch(function(err){
          done(err);
        });
    });

  }); // R

  describe('U: Update operations', function(){
    it('updates a user',function(){});
    it('throws an error when updating a non-existent user',function(){});
    it('',function(){});

  });
});
