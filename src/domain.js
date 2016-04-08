// JavaScript File
var http = require("http");
var https = require("https");
var Debug = require("debug")('worker');
var Promise = require("promise");
var Domain = {
    look: function(domain, options) {
        return new Promise(function(reslove, reject) {
            try {
                if (options.port == 80) {
                    http.get("http://"+domain, reslove).on('error', reject);
                }
                else {
                    https.get("https://"+domain, reslove).on('error', reject);
                }
            }
            catch (e) {
                reject(e);
            }
        });
    },
    success: function(res) {
        //dosomething to parse data domain is working
        return {
            status: "success",
            code: res.statusCode
        };
    },
    error: function(res) {

        return {
            status: "error",
            code: "NOTFOUND"
        };
    }

}

module.exports = {
    look: function(domain, options, callback) {
        
        if (options === undefined) {
            options = {};
            options.port = 80;
        };
        return Domain.look(domain, options)
            .then(Domain.success, Domain.error);
    }
}