"use strict"
const Socket = require("net").Socket;
const EventEmitter = require("events").EventEmitter;
const inherits = require('util').inherits;
const lookup = require("dns").lookup;
const Domain = require("./domain.js");
const Ssh = require("./ssh.js");
const ElasticSearch = require("./elasticsearch.js");
const MongoDb = require("./mongodb.js");
const debug = require("debug")("Client");
const Udp = require("./udp.js");
let Promise = require("promise");

class Client extends EventEmitter {
    constructor() {
        super();
        let _socket = undefined;
        let config = {
            host: undefined,
            port: undefined,
            localAddress: "localhost",
            localPort: undefined,
            lookup: undefined
        }
    }
    connect(cfg) {

        let port = 80;
        switch (cfg.protocol) {
            case 'ssh':
                port = 22;
                break;
            case 'elastic':
                port = 9300;
                break;
            case 'domain':
                cfg.port = cfg.port || 80;
                let domain = new Domain(cfg.host, cfg);
                let promise = domain.look(cfg.host, cfg);
                return promise;
            case 'whois':
                let whois = new Domain(cfg.host, cfg);
                let whoisRet = whois.whois(cfg.host);
                return whoisRet;
            case 'compareHtml':
                let html = new Domain(cfg.host, cfg);
                let compare = html.compare(cfg.host,cfg.compare);
                return compare;
        }
        let self = this;
        if (this._socket && this._socket.writeable) {
            this.once('close', () => {
                self.connect(cfg);
            });
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
        //this._socket.connect(this.config.port, this.config.host, (data) => {});
        return new Promise((resolve, reject) => {
            /**
             * description
             * Step to connect ssh
             */
            switch (cfg.protocol) {
                case 'ssh':
                    // code
                    let sshClient = new Ssh(this._socket, cfg);
                    sshClient.connect(resolve, reject);
                    break;
                case 'mongo':
                    let mongo = new MongoDb(this._socket, cfg);
                    mongo.connect(resolve,reject);
                    break;
                case 'elastic':
                    let elasticClient = new ElasticSearch(this._socket, cfg);
                    elasticClient.connect(resolve, reject);
                    break;
                case 'udp':
                    let udp = new Udp(this._socket,cfg);
                    udp.connect(resolve,reject);
                    break;

                default:
                    // code
            }

        });
    }
}
module.exports = Client;