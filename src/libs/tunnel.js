"use strict"
let tls = require("tls");
class Tunnel extends tls.TLSSocket {
    constructor(socket,options){
        super(socket,options);
    }
}
module.exports = Tunnel;