"use strict"
let debug = require("debug")("Service");
class Service {
    constructor(socket){
        this.socket = socket;
        this.resolve = undefined;
        this.reject = undefined;
    }
    onConnect(callback){
        this.socket.on('connect', () => {
            
        });
    }
    onError(callback){
        this.socket.on('error', (data) => {
            debug(data+"");
            callback({status:"success",code:"ERROR"});
        });
    }
    onTimeout(callback){
        this.socket.on('error', (data) => {
            debug(data+"");
            callback({status:"success",code:"TIMEOUT"});
        });
    }
    connect(resolve,reject){
        this.resolve = resolve;
        this.reject = reject;
        this.onError(this.reject);
        this.onTimeout(this.reject);
        this.onConnect(this.resolve);   
    }
}
module.exports = Service;