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
    const apachestatusfixed = apachestatus.toString().replace('●', '').replace('DFOREGROUND', '');

    const mariadbstatusfixed = mariadbstatus.toString().replace('●', '');
    app.get('/status', (req, res) => {

        res.render('status', {
            date: date.d,
            mariadbstatus: mariadbstatusfixed,
            apachestatus: apachestatusfixed,
        });

        ;
    });
} else {
    require('./utils/localhost')(app, process.env.HTTP_PORT || 3000);
    const date = { d: Date.now() }

    app.get('/status', (req, res) => {

        res.render('status', {
            date: date.d,
            mariadbstatus: 'no data available. this is localhost',
            apachestatus: 'no data available. this is localhost',
        });

        ;
    });

}







