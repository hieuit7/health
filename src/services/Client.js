"use strict"
let Socket = require("net").Socket;
let EventEmitter = require("events").EventEmitter;
let inherits = require('util').inherits;
let lookup = require("dns").lookup;
let Ssh = require("./ssh.js");
let ElasticSearch = require("./elasticsearch.js");
let MongoDb = require("./mongodb.js");
let debug = require("debug")("Client");

let Promise = require("promise");

class Client extends EventEmitter {
    constructor() {
        super();
        var _socket = undefined;
        var config = {
            host: undefined,
            port: undefined,
            localAddress: "localhost",
            localPort: undefined,
            lookup: undefined
        }
    }
    connect(cfg) {
        let self = this;
        if (this._socket && this._socket.writeable) {
            this.once('close', () => {
                self.connect(cfg);
            });
        }
        let port = 80;
        switch (cfg.protocal) {
            case 'ssh':
                port = 22;
                break;
            case 'mongo':
                port = 27017;
                break;
        }
        var config = {
            host: cfg.host || this.config.localAddressp,
            port: cfg.port || port
        }
        this.config = config;
        var socket = this._socket || new Socket({
            writeable: true,
            allowHalfOpen: true
        });
        this._socket = socket;
        this._socket.connect(this.config.port, this.config.host);
        return new Promise((resolve, reject) => {
            /**
             * description
             * Step to connect ssh
             */
            switch (cfg.protocal) {
                case 'ssh':
                    // code
                    let sshClient = new Ssh(this._socket);
                    sshClient.connect(resolve, reject);
                    break;
                case 'mongo':
                    let mongo = new MongoDb(this._socket);
                    break;
                case 'elastic':
                    let elasticClient = new ElasticSearch(this._socket);
                    elasticClient.connect(resolve, reject);
                    break;
                default:
                    // code
            }

        });
    }
}
module.exports = Client;