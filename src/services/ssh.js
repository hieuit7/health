"use strict"
const Tunnel = require("../libs/tunnel.js");
const fs = require("fs");
const Socket = require("net").Socket;
const debug = require("debug")("SSH");
const Service = require("./service.js");
const tls = require("tls");
class Ssh extends Service {
    constructor(socket, cfg) {
        super(socket);
        //cfg.socket = socket;
        // cfg.cert = fs.readFileSync('/home/mingo/.ssh/id_rsa-crt.crt');
        // cfg.key = fs.readFileSync('/home/mingo/.ssh/id_rsa');
        // cfg.ca = [fs.readFileSync('/etc/ssh/ssh_host_rsa_key_cert.pem')];
        // cfg.passphrase = "8953A00fic";
        cfg.rejectUnauthorized = true;
        
        this.tls = tls;
        let secure = this.tls.connect(cfg.port, cfg, () => {
            debug('client connected',
            secure.authorized ? 'authorized' : 'unauthorized');
            this.socket = secure;
            //this.socket.write("SSH2_MSG_KEXINIT\n\r");
        });
        secure.on('error',(error)=>{
            debug(error);
        })

        this.socket.on('data',(data)=>{
            debug(data+"");
        });
        
    }
    connect(resolve, reject) {
        super.connect(resolve, reject);
        this.socket.on('data', (data) => {

        });
    }
}
module.exports = Ssh;