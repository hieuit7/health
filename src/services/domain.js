// JavaScript File
"use strict"
const http = require("http");
const https = require("https");
const debug = require("debug")('domain');
const Dns = require("dns");
const Promise = require("promise");
const whois = require("whois-json-filter");
const os = require('os');
const changeCase = require('change-case');
const _ = require("lodash");
const JSONB = require("json-buffer");
class Domain {
    constructor(host, options) {
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
        return promise.then((data) => {
            return {
                status: "success",
                code: "OK"
            };
        }, (error) => {
            debug(error);
            return {
                status: "success",
                code: "ERROR"
            };
        })
    }
    whois(domain) {
        return new Promise((resolve, reject) => {
            whois(domain, {}, (error, data) => {
                if (error) {
                    reject({
                        status: "success",
                        code: "ERROR"
                    });
                }
                else {
                    //dosomething to get lookup
                    let retData = {};
                    debug(data);
                    if (Object.keys(data).indexOf('domainName') != -1) {
                        retData = _.assign({
                            domainName: data.domainName
                        }, retData);
                        data = _.omit(data, ['domainName']);
                    }
                    else {
                        retData = _.assign({
                            domainName: domain
                        })
                    }
                    let expDate = '';
                    switch (true) {
                        case Object.keys(data).indexOf('registrarRegistrationExpirationDate') != -1:
                            expDate = 'registrarRegistrationExpirationDate';
                            break;
                        case Object.keys(data).indexOf('expirationDate') != -1:
                            // code
                            expDate = 'expirationDate';
                            break;
                        case Object.keys(data).indexOf('expiryDate') != -1:
                            // code
                            expDate = 'expiryDate';
                            break;
                        case Object.keys(data).indexOf('registryExpiryDate') != -1:
                            // code
                            expDate = 'registryExpiryDate';
                            break;
                        case Object.keys(data).indexOf('domainExpirationDate') != -1:
                            // code
                            expDate = 'domainExpirationDate';
                            break;

                    }
                    debug("expr " + expDate);
                    if (expDate != '') {
                        let exp = _.pick(data, expDate);
                        retData = _.assign({
                            expiryDate: _.get(exp, expDate, "undefined")
                        }, retData);
                        data = _.omit(data, [expDate]);
                    }
                    //get nameserver
                    let count = 1;
                    let key = 'nameServer';
                    let keyTmp = key;
                    let nameServer = [];
                    while (Object.keys(data).indexOf(keyTmp) != -1) {
                        nameServer.push({
                            NS: _.get(_.pick(data, keyTmp), keyTmp)
                        });
                        data = _.omit(data, [keyTmp]);
                        keyTmp = key + count;
                        count++;
                    }
                    retData = _.assign({
                        nameServer: nameServer
                    }, retData);
                    retData = _.assign({
                        information: data
                    }, retData);
                    let IP = this.lookup(domain);
                    IP.then((data) => {
                        retData = _.assign({
                            ip: data
                        }, retData);
                        resolve(retData);
                    }, (error) => {
                        retData = _.assign({
                            ip: undefined
                        }, retData);
                        resolve(retData);
                    });
                }
            }, (data) => {
                return this.filterData(data);
            });
        });
    }

    lookup(domain) {
        return new Promise((resolve, reject) => {
            Dns.lookup(domain, {
                all: true,
                hints: Dns.ADDRCONFIG | Dns.V4MAPPED
            }, (error, address) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(address);
                }
            })
        });
    }
    compare(url, compare) {
        return new Promise((resolve, reject) => {
            if (_.startsWith(url, 'https://')) {
                https.get(url, (res) => {
                    let body = '';
                    res.on('data', (data) => {
                        //let json = JSONB.stringify(data);
                        body += data;
                    })
                    res.on('end', () => {
                        //resolved by http://stackoverflow.com/questions/28233505/node-js-undefined1-syntaxerror-unexpected-end-of-input
                        try {
                            let json = JSON.parse(body);
                            let isEqual = false;
                            if (compare !== undefined) {
                                compare = JSON.parse(compare);
                                isEqual = JSON.stringify(json) == JSON.stringify(compare) ? true : false
                            }
                            let ret = {
                                equal: isEqual,
                                data: json
                            }
                            resolve(ret);
                        }
                        catch (e) {
                            debug(e);
                            resolve(e);
                        }
                    })

                }).on('error', reject);
            }
            else if (_.startsWith(url, 'http://')) {
                http.get(url, resolve).on('error', reject);
            }
            else {

            }
        })


    }
    filterData(rawData) {
        //debug(rawData);
        let result = {};
        let data = "";
        let lines = rawData.split(os.EOL);

        lines.forEach(function(line) {
            line = line.trim();
            if (line && line.includes(':')) {
                let lineParts = line.split(':');

                // greater than since lines often have more than one colon, eg values with URLS
                if (lineParts.length >= 2) {
                    let keyName = changeCase.camelCase(lineParts[0]);
                    let keyNameTmp = keyName;
                    let count = 1;
                    while (_.lastIndexOf(Object.keys(result), keyNameTmp) != -1) {
                        keyNameTmp = keyName + "_" + count;
                        count++;
                    }
                    result[keyNameTmp] = lineParts.splice(1).join(':').trim();
                    data += keyNameTmp + ": " + result[keyNameTmp] + "\r\n";
                }
            }
        });
        return data;
    }
}
module.exports = Domain;