// JavaScript File
"use strict"
var lib = require("../src/index.js");
var result = lib.domain.look("gitlab.resource", {
    port: 80
});
result.then(function(res) {
    console.log(res);
}, function(res) {
    console.log(res);
});

//check ssh 
let ssh = lib.service.ssh({
    host: "localhost",
    port: 22
});
ssh.then((data) => {
    console.log(data+"");
}, (error) => {
    console.log(error);
}).then((data)=>{
    console.log(data+"");
});

// let elastic = lib.service.elasticSearch({
//     host: "gitlab.resource"
// });

// elastic.then((data) => {
//     console.log(data+"");
// }, (error) => {
//     console.log(error);
// }).then((data)=>{
//     console.log(data+"");
// });