// JavaScript File
"use strict"
var lib = require("../src/index.js");
var result = lib.look({
    host:"gitlab.resource",
    port: 80
});
result.then(function(res) {
  console.log(res);
}, function(res) {
    console.log(res);
});

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