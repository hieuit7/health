"use strict"
var chai = require("chai");
var expect = require('chai').expect;
var server = require("../index.js").server;
var http = require("http");
var querystring = require("querystring");
// server.listen(8000,'192.168.150.129',1,()=>{
    
// });
// describe('Test server', function() {
//     describe('Test look domain 80', function() {
//         it('Look domain 80 live', function() {
//             var postData = JSON.stringify({
//                 "host": "google.com",
//                 "port": 80
//             });
//             postData+'\r\n';
//             return new Promise((resolve, reject) => {
//                 var client = http.request({
//                     port: 8000,
//                     hostname:"192.168.150.129",
//                     method: "POST",
//                     path: "/domain/look",
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Content-Length': postData.length
//                     }
//                 }, (res) => {
//                     console.log(`STATUS: ${res.statusCode}`);
//                     console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
//                     res.setEncoding('utf8');
//                     res.on('data', (data) => {
//                         resolve(data);
//                     });
//                     res.on('end',()=>{
//                         console.log('end ');
//                     })

//                 });
//                 client.on('error', (error) => {
//                     console.log(error);
//                 })
//                 client.write(postData);
//                 client.end('\r\n');

//             }).then((data) => {
//                 expect(data).to.deep.equal("sss");
//             })
//         });
//     })
// })