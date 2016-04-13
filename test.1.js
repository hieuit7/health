// var assert = require('chai').assert;
// var service = require("../index.js");
// describe('service', function() {
//   describe('#whois()', function () {
//     it('check xxx', function () {
//       assert.equal(1,1,"oke");
//       assert.notEqual(2,1,"oke");
//     });
//   });
// });
"use strict"
var lib = require("../index.js");
// var result = lib.look({
//     host:"gitlab.resource",
//     port: 80
// });
// result.then(function(res) {
//   console.log(res);
// }, function(res) {
//     console.log(res);
// });

//check ssh 
let ssh = lib.ssh({
    host: "gitlab.resource",
    port: 22
});
ssh.then((data) => {
    console.log(data+"");
}, (error) => {
    console.log(error);
}).then((data)=>{
    console.log(data+"");
});