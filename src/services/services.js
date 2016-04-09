"use strict"
let Client = require("./Client.js");
let debug = require("debug")("Service");
let client = new Client();
let Service = {
  ssh: function(cfg) {
    cfg.protocal = "ssh";
    return client.connect(cfg);
  },
  elasticSearch: function(cfg) {
    cfg.protocal = "elastic";
    return client.connect(cfg);
  }
};
module.exports = Service;