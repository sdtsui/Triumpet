var chai = require('chai');
//Not sure if I'll need:
// var chaiAsPromised = require('chai-as-promised');
// chai.use(chaiAsPromised);
// var should = chai.should;

var request = require('request');
var rp = require('request-promise');
var http = require('http');
var expect = chai.expect;

//Schema Dependencies
var Q           = require('q');
var User        = require('../../server/users/model.js');
var findOne     = Q.nbind(User.findOne, User);
var create      = Q.nbind(User.create, User);
// var remove      = Q.nbind(User.remove, User);

describe('serverSpec', function(){
  it('should begin server tests', function(){
    expect('server').to.be.a('string');
  });
});

  var deleteUser = function(cb, username){
    var options = {
      method: 'DELETE',
      uri: 'http://localhost:8080/api/users/'+username,
      resolveWithFullResponse: true
    };
    rp(options)
      .then(function(resp){
        cb();
      }, function(err){
        cb();
      });
    };

  // var deleteUser = function(cb, username){
  //   findOne({'username': username})
  //     .then(function(user){
  //       if(!user){
  //         console.log('user does not exist');
  //       } else {
  //         console.log('removing...');
  //         user.remove();
  //         console.log('successful remove');
  //       }
  //     })
  //     .fail(function(error){
  //       console.log(error);
  //     });
  // };

describe('Server Testing : ', function(){
  describe('Users Controller : ', function(){
    before(function(done){
      //clear phillip
      deleteUser(done, 'phillip');
    })
    after(function(done){
      //delete 'phillip' in case some tests failed
      deleteUser(done, 'phillip');
    });      

    it('Should create new users on reciept of a post request...', function(){
      var newuser = {
        "email"     : "Phillip@triumpet.com",
        "firstName" : "Phillip",
        "lastName"  : "Phillip",
        "password"  : "Phillip",
        "username"  : "Phillip"
      };
      rp({
        method: 'POST',
        uri : 'http://localhost:8080/api/users/signup',
        headers: {
          'Content-Type' : 'application/json' 
        },
        json: newuser
      }).then(function(response){
        expect(response).to.be.a('object');
        expect(response).to.have.property('token');
      }, function(error){
        console.log('error, code :', error.statusCode);

        expect(response).to.be.a('object');
        expect(response).to.have.property('token');

      });


    });
    // it('Should not allow creation of users that already exist', function(){});

    // it ('Should fail on sign-in with a user that doesn't exist', function(){});

    // it('Should fail on sign-in with incorrect credentials', function(){});

    // it('Should succeed on sign-in with correct credentials', function(){});

    // it('Should allow users to modify their profiles', function(){});

    // it('Should already have a working delete method',function(){
    // })


  })
});