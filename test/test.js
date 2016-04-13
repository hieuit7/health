var chai = require("chai");
var expect = require('chai').expect;
var service = require("../src/services/services.js");
describe('service', function() {
  describe('#ssh()', function() {
    it('check ssh', function() {
      var connected = service.ssh({
        host: "gitlab.resource",
        port: 22
      });
      return connected.then((result) => {
        expect(result).to.deep.equal(result, {
          status: "success",
          code: "OK"
        }, "OK");
      }, (error) => {
        expect(error).to.deep.equal({
          status: "success",
          code: "OK"
        });
      });
    });
    it('check ssh fail', function() {
      var connected = service.ssh({
        host: "gitlab.resources",
        port: 22
      });
      return connected.then((result) => {
        expect(result).to.deep.equal(result, {
          status: "success",
          code: "OK"
        });
      }, (error) => {
        expect(error).to.deep.equal({
          status: "success",
          code: "ERROR"
        });
      });
    });
    it('check lookup domain OK', function() {
        
    });
  });
  describe('check lookup domain', function() {
    
  });
});