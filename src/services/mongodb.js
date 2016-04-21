"use strict"
let Service = require("./service.js");
class MongoDb extends Service {
    constructor(socket, cfg) {
        super(socket, cfg);
    }

    /**
     * description
     *
     */
    connect(reslove, reject) {
        super.connect(reslove, reject);
        this.socket.on('data',(data)=>{
            console.log(data);
            reslove({
                status:"success",
                code:"OK"
            });
        });
        this.socket.end('\r\n');
        
    }
    onError(callback) {
        this.socket.on('error', (error) => {
            console.log(error);
            callback({
                status: "success",
                code: "ERROR"
            })
            this.socket.end();
        });
    }
}
module.exports = MongoDb;