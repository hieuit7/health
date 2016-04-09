"use strict"
let Service = require("./service.js");
class MongoDb extends Service {
    constructor(socket) {
        super(socket);
    }

    /**
     * description
     *
     */
    connect(reslove, reject) {
        super.connect(reslove, reject);
    }
}
module.exports = MongoDb;