var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var should = chai.should;

var request = require('request');
var rp = require('request-promise');
var http = require('http');

//Schema Dependencies
var mongoose    = require('mongoose');
var Q           = require('q');
var User        = require('../../server/users/model.js');
var findOne     = Q.nbind(User.findOne, User);
var create      = Q.nbind(User.create, User);
// var remove      = Q.nbind(User.remove, User);
var Q_request   = Q.nbind(request);

//Connecting Database path:
var dbPath      = process.env.dbPath || 'mongodb://localhost/triumpet';
//connect to mongo
mongoose.connect(dbPath);



describe('serverSpec', function(){
  it('should begin server tests', function(){
    expect('server').to.be.a('string');
  });
});
  var deleteUser = function(cb, username){
    console.log(username);
    findOne({username: username})
      .then(function(user){
        console.log('entering success case');
        console.log(user);
        if(!user){
          console.log('user does not exist');
          cb();
        } else {
          console.log('removing...');
          user.remove();
          console.log('successful remove');
          cb();
        }
      })
      .fail(function(error){
        console.log('entering reject case');
        console.log(error);
        done();
      });
  };

  // var deleteUser = function(cb, username){
  //   var options = {
  //     method: 'DELETE',
  //     uri: 'http://localhost:8080/api/users/'+username,
  //     resolveWithFullResponse: true
  //   };
  //   rp(options)
  //     .then(function(resp){
  //       cb();
  //     }, function(err){
  //       cb();
  //     });
  //   };


describe('Server Testing : ', function(){
  describe('Users Controller : ', function(){
    before(function(done){
      //clear phillip
      // deleteUser(done, 'phillip');
      done();
    })
    after(function(done){
      //delete 'phillip' in case some tests failed
      // deleteUser(done, 'phillip');
      done();
    });

    it('Should create new users on reciept of a post request...', function(){
      var newuser = {
        "email"     : "Phillip@triumpet.com",
        "firstName" : "phillip",
        "lastName"  : "phillip",
        "password"  : "phillip",
        "username"  : "phillip"
      };
      console.log('about to send rp');
      // var promise = rp({
      //   method: 'POST',
      //   uri : 'http://localhost:8080/api/users/signup',
      //   headers: {
      //     'Content-Type' : 'application/json'
      //   },
      //   json: newuser
      // })
      // .then(function(response){
      //   console.log('in success case');
      //   console.log(response);
      //   return response;
      //   // expect(response).to.be.a('object');
      //   // expect(response).to.have.property('token');

      // })
      // .catch(function(err){
      //   return err;
      // })

      // var promise = Q_request({
      //   method: 'POST',
      //   uri : 'http://localhost:8080/api/users/signup',
      //   headers: {
      //     'Content-Type' : 'application/json'
      //   },
      //   json: newuser
      // })
      // .then(function(response){
      //   console.log('in success case');
      //   console.log(response);
      //   return response;
      //   // expect(response).to.be.a('object');
      //   // expect(response).to.have.property('token');

      // })
      // .catch(function(err){
      //   return err;
      // });
      // // return promise.to.eventually.have.property('token');
      // return promise.should.be.fulfilled;
      request({
        method: 'POST',
        uri : 'http://localhost:8080/api/users/signup',
        json: newuser
      }, function(error, response, body){
        console.log('in success case');
        console.log(error);
        // console.log(response);
        console.log('body : ', body);
        // expect(response).to.be.a('object');
        // expect(response).to.have.property('token');

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
