var superagent    = require('superagent');
var chai          = require('chai');
var expect        = chai.expect;
var retailer      = require('./retailerTestSpec.js');
var item          = {};

item.create       = function(item, rUserName, cb){
  return superagent.post(this.paths.create+rUserName)
    .send(item)
    .end(cb);
};
item.read         = function(rUserName, cb){
  return superagent.get(this.paths.read+rUserName)
    .end(cb);
};
item.update       = function(rUserName, itemName, changes, cb){
  return superagent.put(this.paths.update+rUserName+'/'+itemName)
    .send(changes)
    .end(cb);
};
item.del          = function(rUserName, itemName, cb){
  var path =this.paths.del+rUserName+'/'+itemName;
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
          category: 'philStuffCategory2'
        }
};

describe('item AJAX testing : ', function(){
  before(function(done){
    //cleanup
    item.del('phil1', sampleItems.philThing1.name, function(e, res){
    });
    item.del('phil1', 'philAPE', function(e, res){
    });

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
    it('creates one new item : ', function(done){
      item.create(sampleItems.philThing1, 'phil1', function(e, res){
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it('can add additional items: ', function(done){
      item.create(sampleItems.philThing2, 'phil1', function(e, res){
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it('fails to create duplicate items : ', function(done){
      item.create(sampleItems.philThing1, 'phil1', function(e, res){
        expect(res.statusCode).to.equal(500);
        done();
      });
    });

    it('fails to create items for non-existent retailers', function(done){
      item.create(sampleItems.philThing2, 'phil99', function(e, res){
        expect(res.statusCode).to.equal(500);
        done();
      });
    });
  });

  describe('Item reading :', function(){
    it('Returns all items for a specific retailer :', function(done){
      item.read('phil1', function(e, res){
        expect(res.body.length).to.equal(2);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it('Throws an error when items are requested for a non-existent retailer',function(done){
      item.read('phillipe', function(e, res){
        expect(res.statusCode).to.equal(500);
        done();
      });
    });
  });

  xdescribe('item updating :', function(){
    //Deprecated. This test uses an old way of updating items. App works in user tests.
    //Please see open issue here:
    //https://github.com/JollyPhantom/Triumpet/issues/106
    //
    //
    it('should allow updating of an item\'s details', function(done){
      var newParams = {
        name: 'philAPE',
        category: 'APE'
      }
      item.update('phil1', 'philStuff', newParams, function(e, res){
        expect(res.statusCode).to.equal(300);

        //Reads all of phil1's items, makes sure the new one exists.
        item.read('phil1', function(e, res){
          var matched = false;
          expect(res.body.length).to.equal(2);
          expect(res.statusCode).to.equal(200);
          for(var i = 0; i < res.body.length; i++){
            if(res.body[i].name === 'philAPE'){
              if(res.body[i].category === 'APE'){
                matched = true;
              }
            }
          }
          matched ? done() : done(new Error('no match, update failed'));
        });
      });
    });

    it('should throw an error when updating a non-existent item', function(done){
      item.update('phil1', 'perpetualMotionMachine', {}, function(e, res){
        expect(res.statusCode).to.equal(500);
        done();
      });
    });

  });//item updating

  describe('item deletion : ', function(){
    it('returns a 500 when attempting to delete nonexistent item', function(done){
      item.del('all' , function(e, res){
        done(new Error('Should not be getting a response if item doesn\'t exist.'));//will call done twice if we get an error
      });
      done();
    });

    it('Deletes an existing item :',function(done){
      item.del('phil1', sampleItems.philThing2.name, function(e, res){
        expect(res.statusCode).to.equal(300);
        done();      
      });

    });
  });

});

