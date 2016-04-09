"use strict"
let Client = require("./Client.js");
let debug = require("debug")("Service");
let client = new Client();
class Service  {
  ssh(cfg) {
    cfg.protocol = "ssh";
    return client.connect(cfg);
  }
  elasticSearch(cfg) {
    cfg.protocol = "elastic";
    return client.connect(cfg);
  }
  look(cfg){
    cfg.protocol = 'domain';
    return client.connect(cfg);
  }
};
module.exports = new Service();