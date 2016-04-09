"use strict"
let Service = require("./service.js");
class ElasticSearch extends Service {
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
module.exports = ElasticSearch;