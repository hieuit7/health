"use strict"
let debug = require("debug")("Service");
class Service {
    constructor(socket, cfg) {
        if (arguments.length) {
            this.socket = socket;
            this.config = cfg;
            this.socket.connect(cfg.port, cfg.host, (data) => {});
            this.resolve = undefined;
            this.reject = undefined;
        }
    }
    onConnect(callback) {
        this.socket.on('connect', () => {

        });
    }
    onError(callback) {
        this.socket.on('error', (data) => {
            debug(data + "");
            callback({
                status: "success",
                code: "ERROR"
            });
        });
    }
    onTimeout(callback) {
        this.socket.on('error', (data) => {
            debug(data + "");
            callback({
                status: "success",
                code: "TIMEOUT"
            });
        });
    }
    connect(resolve, reject) {
        this.resolve = resolve;
        this.reject = reject;
        this.onError(this.reject);
        this.onTimeout(this.reject);
        this.onConnect(this.resolve);
    }
}
module.exports = Service;