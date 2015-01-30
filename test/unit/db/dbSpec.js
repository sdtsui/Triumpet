var chai = require('chai');
var expect = chai.expect;

var mongoose    = require('mongoose');
var Q           = require('q');
var User        = require('../../../server/users/model.js');
var q_findOne   = Q.nbind(User.findOne, User);
var q_create    = Q.nbind(User.create, User);
var q_find      = Q.nbind(User.find, User);

var dbPath      = process.env.dbPath || 'mongodb://localhost/triumpet';
var db = mongoose.connect(dbPath);

describe('ajax: CRUD tests', function(){
  describe('C: Create operations', function(){
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
          done();
        },function(err){
          expect('fail').to.not.equal('fail');
          done(new Error('failed to create'));
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
          done();//pass
        });

    });

  }); // C

  describe('R: Read operations : ', function(){
    before(function(done){
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

    after(function(done){
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
      q_findOne({username: 'AAAlkjasdklfjslkajXXBOOPxYY'})
        .then(function(users){
          if(!users){
            done();
          }else{
            done(new Error('Response is truthy, for non-existent user.'))
          }
        })
        .catch(function(err){
          done(err);
        });
    });

  }); // R

  describe('U: Update operations', function(){
    //scaffold for testing profile updating.
    //MVP does not have this functionality.
    //Open Issue.
    before(function(){
      var newUser = {
        "email"     : "Phillip@triumpet.com",
        "firstName" : "phillip4",
        "lastName"  : "phillip4",
        "password"  : "phillip4",
        "username"  : "phillip4"
        };
      q_create(newUser)
        .then(function(){
          done();
        })
        .catch(function(err){
          done();
        });
    });
    after(function(){
      q_findOne({username: 'phillip4'})
        .then(function(user){
          if(user){
            user.remove();
          }
          done();
        })
        .catch(function(err){
          done();
        })
    });

    xit('updates a user',function(){

    });
    xit('throws an error when updating a non-existent user',function(){

    });
  }); //U

  describe('D: Delete operations', function(){
    before(function(){
      var newUser = {
        "email"     : "Phillip@triumpet.com",
        "firstName" : "phillip4",
        "lastName"  : "phillip4",
        "password"  : "phillip4",
        "username"  : "phillip4"
        };
      q_create(newUser)
        .then(function(){
          done();
        })
        .catch(function(err){
          done();
        });
    });

    after(function(){
      q_findOne({username: 'phillip4'})
        .then(function(user){
          if(user){
            user.remove();
          }
          done();
        })
        .catch(function(err){
          done();
        })
    });

    it('allows deletion of existing users', function(){
      q_findOne({username: 'phillip4'})
        .then(function(user){
          if(user){
            user.remove();
            done();
          }else{
            done(new Error('no user found, cannot delete'));
          }
        })
        .catch(function(err){
          done(err);
        })
    });

    it('does not allow deletion of nonexistent users, or unintentional deletion', function(){
      //find the current number of users:
      var numUsers = 0;
      q_find({})
        .then(function(users){
          numUsers = users.length;
        });

      q_findOne({username: 'arglebargle'})
        .then(function(user){
          if(user){
            user.remove();
            done(new Error('found a user when should not exist'));
          } else{
            done();
          }
        })
        .catch(function(err){
          done(err);
        })

      //expect nothing else to have been deleted
      q_find({})
        .then(function(users){
          expect(users.length).to.equal(numUsers);
        });

    });
  }); //D

});
