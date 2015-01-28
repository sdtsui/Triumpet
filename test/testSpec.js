//checking if testing is working
var chai = require('chai');
var expect = chai.expect;

console.log('test run');

describe('testSpec', function(){
  it('should pass dummy test', function(){
    expect('bar').to.be.a('string');
  });
});
