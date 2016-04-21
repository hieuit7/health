"use strict"
var chai = require("chai");
var expect = require('chai').expect;
var service = require("../index.js").service;

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
          code: "ERROR"
        });
      });
    });
    it('check ssh fail', function() {
      //this.timeout(12000);
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
  });
  describe("Checking mongoDb", function() {
    it("MongoDb ok", function() {
      var mongo = service.mongo({
        host: "gitlab.resource",
        port: 27017
      });
      return mongo.then((data) => {
        expect(data).to.deep.equal({
          status: "success",
          code: "OK"
        })
      }, (error) => {
        expect(error).to.deep.equal({
          status: "success",
          code: "ERROR"
        })
      });
    });
  });
  describe("Test elasticSearch", function() {
    it("Test elasticSearch ok", function() {
      this.timeout(10000);
      var elasticSearch = service.elasticSearch({
        host: "localhost",
        port: 9400
      });
      return elasticSearch.then((data) => {
        expect(data).to.deep.equal({
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
  })
  describe('check udp port', function() {
    it('check open udp port return ok', function() {
      var udp = service.udp({
        port: 22,
        host: "localhost"
      });
      return udp.then((data) => {
        expect(data).to.deep.equal({
          status: "success",
          code: "OK"
        })
      }, (error) => {
        expect(error).to.deep.equal({
          status: "success",
          code: "ERROR"
        });
      });
    })
    it('check open udp port return error', function() {
      var udp = service.udp({
        port: 53,
        host: "localhost"
      });
      return udp.then((data) => {
        expect(data).to.deep.equal({
          status: "success",
          code: "ERROR"
        })
      }, (error) => {
        expect(error).to.deep.equal({
          status: "success",
          code: "ERROR"
        })
      });
    })
  });

});