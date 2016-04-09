// JavaScript File
"use strict"
const http = require("http");
const https = require("https");
const Debug = require("debug")('worker');
const Promise = require("promise");

class Domain {
    constructor(host,options){
        this.host = host;
        if (options === undefined) {
            options = {};
            options.port = 80;
        };
        this.options = options;
    }
    look(domain, options) {
        let promise = new Promise((resolve, reject) => {
            let port = options.port;
            try {
                if (port == 80) {
                    http.get("http://" + domain, resolve).on('error', reject);
                }
                else if (port === 443) {
                    https.get("https://" + domain, resolve).on('error', reject);
                }
                else {
                    throw new Error("Protocal not found");
                }
            }
            catch (e) {
                reject(e);
            }
        });
        return promise.then((data)=>{
            return {status:"success",code:"OK"};
        },(error)=>{
            return {status:"success",code:"ERROR"};
        })
    }
}
module.exports = Domain;