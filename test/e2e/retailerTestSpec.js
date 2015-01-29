var superagent    = require('superagent');
var chai          = require('chai');
var expect        = chai.expect;

var retailer      = {};
retailer.signup   = function(retailer, cb){
  return superagent.post(this.paths.signup)
    .send(user)
    .end(cb);
};

retailer.signin   = function(userAndPass, cb){
  return superagent.post(this.paths.signin)
    .send(userAndPass)
    .end(cb);
};

retailer.read     = function(retailer, cb){};
retailer.update   = function(rUsername, cb){};
retailer.del      = function(retailer, cb){
  var path =''+this.paths.del+retailer;
  console.log(path);
  return superagent.del(path)
    .end(cb);
};

retailer.paths    = {
  signup: 'http://localhost:8080/api/retailers/signup',
  signin: 'http://localhost:8080/api/retailers/signin',
  del: 'http://localhost:8080/api/retailers/',
  update:'http://localhost:8080/api/retailers/',
  read: 'http://localhost:8080/api/retailers/'
}










var sampleRetailers = {
  phil1: {
          username: 'phil1',
          password: 'phil1',
          name:'phil1',
          description: 'phil1',
        },
  phil2: {
          username: 'phil2',
          password: 'phil2',
          name:'phil2',
          description: 'phil2'
        }
};

describe('retailer AJAX testing : ', function(){

  describe('Path: /signup :', function(){
    it('Creates a new retailer by posting to /signup : ', function(done){
      retailer.signup(sampleUsers.phil1, function(e, res){
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it('fails to create duplicate users : ', function(done){
      retailer.signup(sampleUsers.phil1, function(e, res){
        expect(res.statusCode).to.equal(500);
        done();
      });
    })
  });

  describe('Path: /signin :', function(){
    it('does not allow sign-in: username does not exist :', function(done){
      retailer.signin({
        username: 'shitbiscuit',
        password: sampleUsers.phil1.password
      }, function(e, res){
        expect(res.statusCode).to.equal(500);
        done();
      });
    });

    it('does not allow sign-in: username exists, password incorrect',function(done){
      retailer.signin({
        username: sampleUsers.phil1.username,
        password: 'inMotherRussiaComputerHacksYOU'
      }, function(e, res){
        expect(res.statusCode).to.equal(500);
        done();
      });
    });

    it('allows sign-in with correct username and password :', function(done){
      retailer.signin({
        username: sampleUsers.phil1.username,
        password: sampleUsers.phil1.password
      }, function(e, res){
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('Path: /users - for deletion : ', function(){

    it('returns a 500 when attempting to delete nonexistent retailer', function(done){
      retailer.del('all' , function(e, res){
        expect(res.statusCode).to.equal(500);
        done();
      });
    });

    it('Deletes an existing retailer with DEL to /users/: username :',function(done){
      retailer.del('phil1', function(e, res){
        expect(res.statusCode).to.equal(300);
        done();
      });
    });
  });
});
