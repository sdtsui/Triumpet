var chai = require('chai');
var expect = chai.expect;

describe('dummy test spec', function(){
  it ('should demonstrate mocha is running tests', function(){
    expect('dummy test').to.be.a('string');
  });
});
