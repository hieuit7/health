"use strict"
const debug = require("debug")("elastic");
const Service = require("./service.js");
class ElasticSearch extends Service {
    
    connect(reslove, reject) {
        super.connect(reslove, reject);
        this.socket.on('connect',(data)=>{
            reslove({
                status:"success",
                code:"OK"
            });
        });
        //this.socket.end('\r\n');
        
    }
    
    onError(callback) {
        this.socket.on('error', (error) => {
            callback({
                status: "success",
                code: "ERROR"
            })
            this.socket.end();
        });
    }
}
module.exports = ElasticSearch;