// JavaScript File
"use strict"
let http = require("http");
let https = require("https");
let Debug = require("debug")('worker');
let Promise = require("promise");
let Domain = {
    look(domain, options ) {
            return new Promise((reslove, reject) => {
                let port = options.port;
                try {
                    if (port == 80) {
                        http.get("http://" + domain, reslove).on('error', reject);
                    }
                    else if (port === 443 ){
                        https.get("https://" + domain, reslove).on('error', reject);
                    } else {
                        throw new Error("Protocal not found");
                    }
                }
                catch (e) {
                    reject(e);
                }
            });
        },
        success(res) {
            //dosomething to parse data domain is working
            return {
                status: "success",
                code: res.statusCode
            };
        },
        error(res) {
            return {
                status: "error",
                code: "NOTFOUND"
            };
        }

}

module.exports = {
    look(domain, options ) {

            if (options === undefined) {
                options = {};
                options.port = 80;
            };
            return Domain.look(domain, options)
                .then(Domain.success, Domain.error);
        }
}