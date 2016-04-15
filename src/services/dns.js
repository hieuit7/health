"use strict"
const whois = require("whois-json-filter");
const os = require('os');
const changeCase = require('change-case');
const _ = require("lodash");
whois('nguyenminhhieu.net',{}, function(err, data) {
    console.log(data)
},(rawData)=>{ 
    var result = {};
    var data = ""
    var lines = rawData.split(os.EOL);
    
    lines.forEach(function(line){
        line = line.trim();
        if ( line && line.includes(': ') ) {
            var lineParts = line.split(':');

            // greater than since lines often have more than one colon, eg values with URLS
            if ( lineParts.length >= 2 ) {
                var keyName = changeCase.camelCase(lineParts[0]);
                let keyNameTmp = keyName;
                let count = 1;
                while(_.lastIndexOf(Object.keys(result),keyNameTmp) != -1){
                    keyNameTmp=keyName+"_"+count;
                    count++;
                }
                result[keyNameTmp] = lineParts.splice(1).join(':').trim();
                data+=keyNameTmp+": "+result[keyNameTmp]+"\r\n";
            }
        }
    });
    return data;
})