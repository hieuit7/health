"use strict"
const debug = require("debug")("elastic");
const Service = require("./service.js");
class ElasticSearch extends Service {
    constructor(socket) {
        super(socket);
    }

    /**
     * description
     *
     */
    connect(resolve, reject) {
        
        super.connect(resolve, reject);
        this.socket.on('data', (data) => {
            debug(data+"");
            resolve({status:"success",code:"OK"});
            //this.socket.end();
        });
        
        this.socket.on('connect',()=>{
            resolve({status:"success",code:"OK"});
        });
        
        
    }
    onError(callback){
        this.socket.on('error', (data) => {
            debug(data+"");
            callback({status:"success",code:"ERROR"});
        });
    }
    
}
module.exports = ElasticSearch;