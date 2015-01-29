var superagent    = require('superagent');
var chai          = require('chai');
var expect        = chai.expect;
var retailer      = require('./retailerTestSpec.js');
var item          = {};

item.create       = function(item, cb, rUserName){
  return superagent.post(this.paths.create+rUserName)
    .send(item)
    .end(cb);
};
item.read         = function(item, cb, rUserName){
  return superagent.get(this.paths.read+rUserName)
    .end(cb);
};
item.update       = function(rUserName, itemName, changes, cb){
  return superagent.put(this.paths.update+rUsername+'/'+itemName)
    .send(changes)
    .end(cb);
};
item.del          = function(rUserName, itemName, cb){
  var path =this.paths.del+rUsername+'/'+itemName;
  return superagent.del(path)
    .end(cb);
};

item.paths        = {
  create: 'http://localhost:8080/api/items/',
  del: 'http://localhost:8080/api/items/',
  update:'http://localhost:8080/api/items/',
  read: 'http://localhost:8080/api/items/'
};

var sampleItems     = {
  philStuff: {
          name: 'philStuff',
          category: 'philStuffCategory'
        },
  phil2Stuff: {
          name: 'phil2Stuff',
          category: 'phil2StuffCategory'
        }
};


//Breaker, forgot to finish all of retailers




describe('item AJAX testing : ', function(){

  describe('item creation :', function(){
    it('Creates a new item by posting to /signup : ', function(done){
      item.signup(sampleRetailers.phil1, function(e, res){
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it('fails to create duplicate users : ', function(done){
      item.signup(sampleRetailers.phil1, function(e, res){
        expect(res.statusCode).to.equal(500);
        done();
      });
    })
  });

  xdescribe('item retrieval :', function(){
    //Open Issue: schema has password 'select' field set to false;
    it('does not allow sign-in: username does not exist :', function(done){
      item.signin({
        username: 'shitbiscuit',
        password: sampleRetailers.phil1.password
      }, function(e, res){
        expect(res.statusCode).to.equal(500);
        done();
      });
    });

    it('does not allow sign-in: username exists, password incorrect',function(done){
      item.signin({
        username: sampleRetailers.phil1.username,
        password: 'inMotherRussiaComputerHacksYOU'
      }, function(e, res){
        expect(res.statusCode).to.equal(500);
        done();
      });
    });

    it('allows sign-in with correct username and password :', function(done){
      item.signin({
        username: sampleRetailers.phil1.username,
        password: sampleRetailers.phil1.password
      }, function(e, res){
        console.log('res : ', res);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  xdescribe('item deletion : ', function(){

    it('returns a 500 when attempting to delete nonexistent item', function(done){
      item.del('all' , function(e, res){
        expect(res.statusCode).to.equal(500);
        done();
      });
    });

    it('Deletes an existing item with DEL to /users/: username :',function(done){
      item.del('phil1', function(e, res){
        expect(res.statusCode).to.equal(300);
        done();
      });
    });
  });
});
