var superagent    = require('superagent');
var chai          = require('chai');
var expect        = chai.expect;
var retailer      = require('./retailerTestSpec.js');
var item          = {};

item.create       = function(item, rUserName, cb){
  console.log(item);
  item.retailer = rUserName;
  return superagent.post(this.paths.create+rUserName)
    .send(item)
    .end(cb);
};
item.read         = function(item, rUserName, cb){
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

var sampleItems   = {
  philThing1: {
          name: 'philStuff',
          category: 'philStuffCategory'
        },
  philThing2: {
          name: 'phil2Stuff',
          category: 'phil2StuffCategory'
        }
};


//Breaker, forgot to finish all of retailers




describe('item AJAX testing : ', function(){
  before(function(done){
    //make sure a retailer is present, to insert into
    var phil = {
      username: 'phil1',
      password: 'phil1',
      name:'phil1',
      description: 'phil1'
    };
    //create phil
    superagent.post(retailer.paths.signup)
      .send(phil)
      .end(function(err, res){
        done();
      });

    });

  describe('item creation :', function(){
    it('creates a new item : ', function(done){
      item.create(sampleItems.philThing1, 'phil1', function(e, res){
        console.log('res body, res statuscode', res.body, res.statusCode);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it('fails to create duplicate items : ', function(done){
      item.create(sampleItems.philThing1, 'phil1', function(e, res){
        console.log('res body, res statuscode', res.body, res.statusCode);
        expect(res.statusCode).to.equal(500);
        done();
      });
    });

    it('fails to create items for non-existent retailers', function(done){
      item.create(sampleItems.philThing2, 'phil99', function(e, res){
        console.log('res body, res statuscode', res.body, res.statusCode);
        expect(res.statusCode).to.equal(500);
        done();
      });

    });
  });

  xdescribe('Path: /signin :', function(){
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
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });
  //use put
  xdescribe('item updating', function(){
    it('should allow updating of an item\'s details', function(done){
      //phil1 already exists
      //update an item's details
      //find, and see if they match

      var newParams = {
        name: 'philAPE',
        description: 'RAWR!'
      }
      item.update('phil1', newParams, function(e, res){
        expect(res.statusCode).to.equal(300);
        done();
      });

    });

    it('should throw an error when updating a non-existent item', function(done){
      item.update('flagellum', {}, function(e, res){
        expect(res.statusCode).to.equal(500);
        done();
      })
    });
  });
  //use get
  xdescribe('item retrieval', function(){
    before(function(done){
      item.create(sampleRetailers.phil2, function(e, res){
        expect(res.statusCode).to.equal(200);
        done();
      });

    })
    it('should return all retailers, after insertion of a new one', function(done){

      item.read(function(e, res){
        expect(res.body.length).to.equal(2);
        done();
      })
    });
  })

  xdescribe('item deletion : ', function(){
    it('returns a 500 when attempting to delete nonexistent item', function(done){
      item.del('all' , function(e, res){
        expect(res.statusCode).to.equal(500);
        done();
      });
    });

    it('Deletes an existing item with DEL to /retailers/: username :',function(done){
      item.del('phil1', function(e, res){
        expect(res.statusCode).to.equal(300);
      });

      item.del('phil2', function(e, res){
        expect(res.statusCode).to.equal(300);
        done();
      });

    });
  });
});
