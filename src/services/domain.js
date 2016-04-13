// JavaScript File
"use strict"
const http = require("http");
const https = require("https");
const debug = require("debug")('domain');
const Dns = require("dns");
const Promise = require("promise");

class Domain {
    constructor(host,options){
        this.host = host;
        if (options === undefined) {
            options = {};
            options.port = 80;
        };
        this.options = options;
        debug(options);
    }
    look(domain, options) {
        let promise = new Promise((resolve, reject) => {
            let port = options.port;
            
            try {
                if (port == 80) {
                    http.get("http://" + domain, resolve).on('error', reject);
                }
                else if (port == 443) {
                    https.get("https://" + domain, resolve).on('error', reject);
                }
                else {
                    throw new Error("Protocol not found");
                }
            }
            catch (e) {
                reject(e);
            }
        });
        return promise.then((data)=>{
            return {status:"success",code:"OK"};
        },(error)=>{
            debug(error);
            return {status:"success",code:"ERROR"};
        })
    }
    whois(domain){
        let dns = Dns.resolve('nguyenminhhieu.net',(data)=>{
            console.log(data);
        })
    }
}
module.exports = Domain;