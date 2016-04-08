// JavaScript File
var lib = require("./src/index.js");
var result = lib.domain.look("gitlab.resource",{port:80});
result.then(function(res){
    console.log(res);
},function(res){
    console.log(res);
})