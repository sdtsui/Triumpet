var chai = require('chai');
var expect = chai.expect;

describe('Dummy Server Test', function(){
  it ('should run server tests', function(){
    expect('dummy test').to.be.a('string');
  });
});
