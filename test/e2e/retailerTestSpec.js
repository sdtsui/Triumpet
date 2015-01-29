var superagent    = require('superagent');
var chai          = require('chai');
var expect        = chai.expect;

var retailer      = {};
retailer.signup   = function(retailer, cb){
  return superagent.post(this.paths.signup)
    .send(retailer)
    .end(cb);
};
retailer.signin   = function(userAndPass, cb){
  console.log(userAndPass);
  return superagent.post(this.paths.signin)
    .send(userAndPass)
    .end(cb);
};
retailer.read     = function(retailer, cb){
  return superagent.get(this.paths.read)
    .end(cb);
};
retailer.update   = function(rUsername, changes, cb){
  return superagent.put(this.paths.update+rUsername)
    .send(changes)
    .end(cb);
};
retailer.del      = function(retailer, cb){
  var path =this.paths.del+retailer;
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

module.exports = retailer;

describe('retailer AJAX testing : ', function(){

  xdescribe('Path: /signup :', function(){
    it('Creates a new retailer by posting to /signup : ', function(done){
      retailer.signup(sampleRetailers.phil1, function(e, res){
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it('fails to create duplicate retailers : ', function(done){
      retailer.signup(sampleRetailers.phil1, function(e, res){
        expect(res.statusCode).to.equal(500);
        done();
      });
    })
  });

  xdescribe('Path: /signin :', function(){
    //Open Issue: schema has password 'select' field set to false;
    it('does not allow sign-in: username does not exist :', function(done){
      retailer.signin({
        username: 'shitbiscuit',
        password: sampleRetailers.phil1.password
      }, function(e, res){
        expect(res.statusCode).to.equal(500);
        done();
      });
    });

    it('does not allow sign-in: username exists, password incorrect',function(done){
      retailer.signin({
        username: sampleRetailers.phil1.username,
        password: 'inMotherRussiaComputerHacksYOU'
      }, function(e, res){
        expect(res.statusCode).to.equal(500);
        done();
      });
    });

    it('allows sign-in with correct username and password :', function(done){
      retailer.signin({
        username: sampleRetailers.phil1.username,
        password: sampleRetailers.phil1.password
      }, function(e, res){
        console.log('res : ', res);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });
  //use put
  describe('retailer updating', function(){
    it('should allow updating of a retailer\'s details', function(){

    });

    it('should throw an error when updating a non-existent retailer', function(){
      //see which part of the url it's using
    });
  });
  //use get
  describe('retailer retrieval', function(){
    it('should return all retailers', function(){

    });
  })

  xdescribe('retailer deletion : ', function(){

    it('returns a 500 when attempting to delete nonexistent retailer', function(done){
      retailer.del('all' , function(e, res){
        expect(res.statusCode).to.equal(500);
        done();
      });
    });

    it('Deletes an existing retailer with DEL to /retailers/: username :',function(done){
      retailer.del('phil1', function(e, res){
        expect(res.statusCode).to.equal(300);
        done();
      });
    });
  });
});