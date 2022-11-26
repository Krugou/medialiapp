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
mariadbstatus.replace('Main PID: 1228 (mysqld_safe) CGroup: /system.slice/mariadb.service ├─1228 /bin/sh /usr/bin/mysqld_safe --basedir=/usr └─1436 /usr/libexec/mysqld --basedir=/usr --datadir=/var/lib/mysql --plugin-dir=/usr/lib64/mysql/plugin --log-error=/var/log/mariadb/mariadb.log --pid-file=/var/run/mariadb/mariadb.pid --socket=/var/lib/mysql/mysql.sock', ' '
).replace('mariadb.service - MariaDB database server Loaded: loaded (/usr/lib/systemd/system/mariadb.service; enabled; vendor preset: disabled)', ' ')
console.log(mariadbstatus)


app.get('/status', (req, res) => {

    res.render('status', {
        date: date.d,
        mariadbstatus: mariadbstatus,
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