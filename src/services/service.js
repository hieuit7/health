"use strict"
let debug = require("debug")("Service");
class Service {
    constructor(socket){
        this.socket = socket;
        this.resolve = undefined;
        this.reject = undefined;
        this.socket.on('connect', () => {
            
            debug("On connect");
        });
    }
    onError(error){
        //this.call(this.reject);
    }
    connect(resolve,reject){
        this.resolve = resolve;
        this.reject = reject;
        this.socket.on('error',this.reject);
        this.socket.on('timeout', this.reject);
    }
}
module.exports = Service;