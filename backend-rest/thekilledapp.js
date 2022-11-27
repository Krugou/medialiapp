'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');

app.set('view engine', 'ejs');
app.use(cors());
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'production') {
    require('./utils/production')(app, process.env.HTTP_PORT || 3000, process.env.HTTPS_PORT || 8000);
    const mariadbstatus = fs.readFileSync('/home/allseeyingeye/medialiapp/backend-rest/mariadbstatus.txt');
    const apachestatus = fs.readFileSync('/home/allseeyingeye/medialiapp/backend-rest/apachestatus.txt');
    const date = { d: Date.now() }

    const mariadbstatusfixed = mariadbstatus.toString().replace('Main').replace('--plugin-dir=/usr/lib64/mysql/plugin', '').replace('--log-error=/var/log/mariadb/mariadb.log', '').replace('--pid-file=/var/run/mariadb/mariadb.pid', '').replace('--socket=/var/lib/mysql/mysql.sock', ' ').replace('mariadb.service', '').replace('-', '').replace('MariaDB', '').replace('database', '').replace('server', '').replace('Loaded:', '').replace('loaded', '').replace('(/usr/lib/systemd/system/mariadb.service;', '').replace('enabled;', '').replace('vendor', '').replace('preset:', '').replace('disabled', '').replace('undefined', '').replace('PID:', '').replace('1228', '').replace('', '').replace('(mysqld_safe)', '').replace('CGroup:', '').replace('/system.slice/mariadb.service', '').replace('├─1228', '').replace('bin', '').replace('/', '').replace('sh', '').replace('usr', '').replace('bin', '').replace('mysqld_safe--basedir', '').replace('/usr', '').replace('└─1436', '').replace('usr', '').replace('libexec', '').replace('mysqld--basedir', '').replace('', '').replace('/usr', '').replace('--datadir=/var', '').replace('lib', '').replace('mysql', '').replace('/', '').replace('d_safe', '').replace('--basedir=', '').replace('/mysqld', '').replace('--basedir=', '').replace('/mysql', '')
    app.get('/status', (req, res) => {

        res.render('status', {
            date: date.d,
            mariadbstatus: mariadbstatusfixed,
            apachestatus: apachestatus,
        });

        ;
    });
} else {
    require('./utils/localhost')(app, process.env.HTTP_PORT || 3000);
    const date = { d: Date.now() }

    app.get('/status', (req, res) => {

        res.render('status', {
            date: date.d,
            mariadbstatus: 'no data available',
            apachestatus: 'no data available',
        });

        ;
    });

}







