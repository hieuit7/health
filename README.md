#Monitor serivces 
=============

## How to use it?

### Install 

```javascript
npm install health-monitor-service --save
```
or install global
```javascript
npm install health-monitor-service -g
```

### Use with lib

```javascript
const Service = require('health-monitor-service').service;
let cfg = {host:"localhost",port:22};
let promise = Service.ssh(cfg);
promise.then((data)=>{
    //dosomething right
},(error)=>{
    //dosomething error
});
```
### Use with web server

```javascript
const server = require('health-monitor-service').server;
server.listen("your_port", "your_host", 1, (req, res) => {
    //dosome thing
});
```