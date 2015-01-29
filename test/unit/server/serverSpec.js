var chai = require('chai');
var expect = chai.expect;

xdescribe('Dummy Server Test', function(){
  it ('should run server tests', function(){
    expect('Open Issue: Server Unit tests!').to.be.a('string');
  });
});
