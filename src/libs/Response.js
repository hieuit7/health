"use strict"
const _ = require("lodash");
class Response {
    constructor() {
        this.headers = {};
        this.data = {}
    }
    getStatusCode(){
        return this.headers.statusCode || 404;
    }
    getData(){
        return JSON.stringify(this.data||{message:"NOTFOUND",code:404});
    }
    addData(data){
        this.data = _.assign(data,this.data);
    }
    setData(data){
        this.data = data;
    }
    addHeader(header){
        this.headers = _.assign(header,this.headers);
    }
    setHeaders(headers) {
        this.headers = headers;
    }
    getHeader(){
        return this.headers||{};
    }
}
module.exports = Response;