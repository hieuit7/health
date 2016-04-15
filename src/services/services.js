"use strict"
let Client = require("./Client.js");
let debug = require("debug")("Service");
let client = new Client();
class Service {
  ssh(cfg) {
    cfg.protocol = "ssh";
    return client.connect(cfg);
  }
  elasticSearch(cfg) {
    cfg.protocol = "elastic";
    return client.connect(cfg);
  }
  look(cfg) {
    cfg.protocol = 'domain';
    return client.connect(cfg);
  }
  whois(domain) {
    let cfg ={};
    cfg.protocol = 'whois';
    cfg.host = domain;
    return client.connect(cfg);
  }
  compare(url){
    let cfg = {};
    cfg.protocol = 'compareHtml';
    cfg.port = 0;
    cfg.host = url;
    return client.connect(cfg);
  }
};
module.exports = new Service();