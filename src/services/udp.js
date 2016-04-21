"use strict"
const dgram = require("dgram");
const Service = require("./service.js");
const debug = require("debug");

class Udp extends Service {
    constructor(socket, cfg) {
        super();
        socket = dgram.createSocket('udp4');
        this.socket = socket;
        this.resolve = undefined;
        this.reject = undefined;
        this.config = cfg;
        
    }
    connect(resolve, reject) {
        super.connect(resolve, reject);
        this.socket.send("test", this.config.port, this.config.host, (error) => {
            debug(error);
            reject({
                status: "success",
                code: "ERROR"
            });
        });
        this.onData(this.resolve);

    }
    onData(callback) {
        this.socket.on('data', (data) => {
            debug(data + "");
            callback({
                status: "success",
                code: "OK"
            })
        });
    }
    onTimeout(callback) {
        
    }

}
module.exports = Udp;