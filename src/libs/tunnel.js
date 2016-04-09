"use strict"
let TLSSocket = require("tls").TLSSocket;
class Tunnel extends TLSSocket {
    constructor(socket,options){
        super(socket,options);
    }
}
module.exports = Tunnel;