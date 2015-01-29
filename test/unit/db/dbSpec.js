var chai = require('chai');
var expect = chai.expect;
var should = chai.should;

var mongoose    = require('mongoose');
var Q           = require('q');
var User        = require('../../../server/users/model.js');
var q_findOne     = Q.nbind(User.findOne, User);
var q_create      = Q.nbind(User.create, User);

var dbPath      = process.env.dbPath || 'mongodb://localhost/triumpet';
mongoose.connect(dbPath);

describe('Dummy DB Test', function(){
  it ('run server tests', function(){
    expect('dummy test').to.be.a('string');
  });
});

describe('users CRUD tests', function(){

  describe('create operations', function(){
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
      q_create(newUser)
        .then(function(){
          expect('pass').to.equal('pass');
        },function(err){
          expect('Initial non-duplicate user creation failed').to.not.be.a('string');
          done(err);
        });

      q_create(newUser)
        .then(function(){
          done(new Error('Creating duplicate when should be impossible.'));
        })
        .catch(function(err){
          done();
        });

    });

  })
})
