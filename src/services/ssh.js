"use strict"
let Tunnel = require("../libs/tunnel.js");
let debug = require("debug")("SSH");
let Service = require("./service.js");
class Ssh extends Service {
    constructor(socket) {
        super(socket);
        this.tls = new Tunnel(socket,{});
        debug(this.tls.localAddress);
    }
    connect(resolve, reject) {
        super.connect(resolve, reject);
        this.socket.on('data',(data)=>{
            
        });
    }
}
module.exports = Ssh;