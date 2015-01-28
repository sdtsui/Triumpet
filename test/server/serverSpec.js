var chai = require('chai');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;
var should = chai.should;

describe('serverSpec', function(){
  it('should begin server tests', function(){
    expect('server').to.be.a('string');
  });
});
