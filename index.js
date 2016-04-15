"use strict"
const service = require("./src/services/services.js");
const https = require("https");
const fs = require("fs");
const debug = require("debug")("INDEX");
const _ = require("lodash");
const Response = require("./src/libs/Response.js");
const Promise = require("promise");
const options = {
    //TODO will be replace by configuration file to load key
    key: fs.readFileSync("./src/keys/server.pem"),
    cert: fs.readFileSync("./src/keys/server-crt.pem")
}

let server = https.createServer(options, (req, res) => {
    debug(req.url);
    let response = new Response();
    response.addHeader({
        statusCode: 200
    });
    response.addHeader({
        "Content-Type": 'application/json',
        Trailer: 'Content-MD5'
    });
    let request = new Promise((resolve, reject) => {
        req.on('data', resolve);
        req.on('error', reject);
    });
    let Res = new Promise((resolve, reject) => {
        switch (true) {
            case _.startsWith(req.url, '/domain'):
                let domain = _.replace(req.url, '/domain/', '');
                debug(domain);
                switch (domain) {
                    case 'look':
                        request.then((data) => {
                            debug(data + "");
                            try {
                                data = JSON.parse(data)
                                let ret = service.look(data);
                                ret.then((res) => {
                                    debug(res);
                                    response.setData(res);
                                    resolve(response);
                                })
                            }
                            catch (e) {
                                debug(e);
                                reject(e);
                            }
                        })
                        break;
                    case 'whois':
                        request.then((data) => {
                            debug(data + "");
                            data = JSON.parse(data);
                            let whoisRet = service.whois(data.host);
                            whoisRet.then((res) => {
                                debug(res);
                                response.setData(res);
                                resolve(response);
                            }, (error) => {

                            })
                        }, (error) => {
                            debug(error + "");
                        });
                        break;
                    case 'compare':
                        request.then((data)=>{
                           debug(data+"sss");
                           data= JSON.parse(data);
                           let compare = service.compare(data.host);
                           
                          compare.then((data)=>{
                              response.setData(data);
                              resolve(response);
                          },(error)=>{
                               
                          })
                        },(error)=>{
                            debug(error+"");
                        });
                        break;                    
                    default:
                        response.setData({
                            status: "success",
                            code: "ERROR",
                            messagge: "service not found"
                        })
                }
                break;
            case _.startsWith(req.url, '/services'):
                let serviceName = _.replace(req.url, '/services/', '');
                debug(serviceName);
                switch (serviceName) {
                    case 'ssh':
                        request.then((data) => {
                            try {
                                debug(data + "");
                                let cfg = JSON.parse(data);
                                let ret = service.ssh(cfg);
                                ret.then((data) => {
                                    debug(data);
                                    response.setData(data);
                                    resolve(response);
                                }, (error) => {
                                    debug(error);
                                    response.setData(error);
                                    resolve(response);
                                })
                            }
                            catch (e) {
                                debug(e);
                                reject(e);
                            }
                        })
                        break;
                    case 'elastic':
                        request.then((data) => {
                            try {
                                let cfg = JSON.parse(data);
                                debug(cfg)
                                let ret = service.elasticSearch(cfg);
                                ret.then((data) => {
                                    response.setData(data);
                                    resolve(response);
                                }, (error) => {
                                    debug(error);
                                })

                            }
                            catch (e) {
                                debug(e);
                            }
                        }, (error) => {
                            debug(error);
                        })

                        break;

                }
                break;
            case _.startsWith(req.url, '/'):
                // code
                res.writeHead(200);
                res.end('Health API\n');
                break;
            default:
                res.writeHead(200);
                res.end('Notfound\n');
        }
    });

    Res.then((data) => {
        res.writeHead(data.getStatusCode(), data.getHeader());
        res.end(data.getData());
    })


});
server.listen(8000, "192.168.150.129", 1, (req, res) => {
    console.log(req);
});
module.exports = server;