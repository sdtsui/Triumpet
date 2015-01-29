var superagent = require('superagent');
var chai = require('chai');
var expect = chai.expect;

//Helper functions
var user = {};
user.signup = function(user, cb){
  return superagent.post(this.paths.signup)
    .send(user)
    .end(cb);
};
user.del = function(user, cb){
  var path =''+this.paths.del+user;
  console.log(path);
  return superagent.del(path)
    .end(cb);
};
user.signin = function(credentialsObj, cb){
  return superagent.post(this.paths.signin)
    .send(credentialsObj)
    .end(cb);
};
user.paths = {
  signup: 'http://localhost:8080/api/users/signup',
  signin: 'http://localhost:8080/api/users/signin',
  del: 'http://localhost:8080/api/users/'
}

var sampleUsers = {
  phil1: {
          username: 'phil1',
          password: 'phil1',
          firstName:'phil1',
          lastName: 'phil1',
          email: 'phil@phil.com'
        },
  phil2: {
          username: 'phil2',
          password: 'phil2',
          firstName:'phil2',
          lastName: 'phil2',
          email: 'phil2@phil.com'
        }
};

describe('ajax CRUD testing : ', function(){

  describe('Path: /signup :', function(){
    it('Creates a new user by posting to /signup : ', function(done){
      user.signup(sampleUsers.phil1, function(e, res){
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it('fails to create duplicate users : ', function(done){
      user.signup(sampleUsers.phil1, function(e, res){
        expect(res.statusCode).to.equal(500);
        done();
      });
    })
  });

  describe('Path: /signin :', function(){
    it('does not allow sign-in: username does not exist :', function(done){
      user.signin({
        username: 'shitbiscuit',
        password: sampleUsers.phil1.password
      }, function(e, res){
        expect(res.statusCode).to.equal(500);
        done();
      });
    });

    it('does not allow sign-in: username exists, password incorrect',function(done){
      user.signin({
        username: sampleUsers.phil1.username,
        password: 'inMotherRussiaComputerHacksYOU'
      }, function(e, res){
        expect(res.statusCode).to.equal(500);
        done();
      });
    });

    it('allows sign-in with correct username and password :', function(done){
      user.signin({
        username: sampleUsers.phil1.username,
        password: sampleUsers.phil1.password
      }, function(e, res){
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('Path: /users - for deletion : ', function(){

    it('returns a 500 when attempting to delete nonexistent user', function(done){
      user.del('all' , function(e, res){
        expect(res.statusCode).to.equal(500);
        done();
      });
    });

    it('Deletes an existing user with DEL to /users/: username :',function(done){
      user.del('phil1', function(e, res){
        expect(res.statusCode).to.equal(300);
        done();
      });
    });
  });
});
