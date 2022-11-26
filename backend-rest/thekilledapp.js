'use strict';

const express = require('express');
const fs = require('fs');
const https = require('https');

const app = express();
app.set('view engine', 'ejs');
// kommentoi alla oleva pois että tämä toimii kotikoneella
// https://wiki.centos.org/HowTos/Https#head-37cd1f5c67d362756f09313cd758bef48407c325
const mariadbstatus = fs.readFileSync('/home/allseeyingeye/medialiapp/backend-rest/mariadbstatus.txt');
const apachestatus = fs.readFileSync('/home/allseeyingeye/medialiapp/backend-rest/apachestatus.txt');
const sslkey = fs.readFileSync('/etc/pki/tls/private/ca.key');
const sslcert = fs.readFileSync('/etc/pki/tls/certs/ca.crt');
const options = {
    key: sslkey,
    cert: sslcert
};
// kommentoi yllä oleva pois että tämä toimii kotikoneella
const date = { d: Date.now() }
console.log(mariadbstatus)
const mariadbstatusfixed = mariadbstatus.toString().replace('Main').replace('--plugin-dir=/usr/lib64/mysql/plugin', '').replace('--log-error=/var/log/mariadb/mariadb.log', '').replace('--pid-file=/var/run/mariadb/mariadb.pid', '').replace('--socket=/var/lib/mysql/mysql.sock', ' '
).replace('mariadb.service', '').replace('-', '').replace('MariaDB', '').replace('database', '').replace('server', '').replace('Loaded:', '').replace('loaded', '').replace('(/usr/lib/systemd/system/mariadb.service;', '').replace('enabled;', '').replace('vendor', '').replace('preset:', '').replace('disabled', '').replace('undefined', '').replace('PID:', '').replace('1228', '').replace('', '').replace('(mysqld_safe)', '').replace('CGroup:', '').replace('/system.slice/mariadb.service', '').replace('├─1228', '').replace('bin', '').replace('/', '').replace('sh', '').replace('usr', '').replace('bin', '').replace('mysqld_safe--basedir', '').replace('/usr', '').replace('└─1436', '').replace('usr', '').replace('libexec', '').replace('mysqld--basedir', '').replace('', '').replace('/usr', '').replace('--datadir=/var', '').replace('lib', '').replace('mysql', '').replace('/', '').replace('d_safe', '').replace('--basedir=', '').replace('/mysqld', '').replace('--basedir=', '').replace('/mysql', '')
console.log(mariadbstatusfixed)


app.get('/status', (req, res) => {

    res.render('status', {
        date: date.d,
        mariadbstatus: mariadbstatusfixed,
        apachestatus: apachestatus,
    });

    ;
});
// kommentoi alla oleva pois että tämä toimii kotikoneella
app.get('/', (req, res) => {
    if (req.secure) res.send('https secure');
    else res.send('http not secure');
});
// kommentoi yllä oleva pois että tämä toimii kotikoneella
app.listen(3000); //normal http traffic

// kommentoi alla oleva pois että tämä toimii kotikoneella
https.createServer(options, app).listen(8000); //https traffic