'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const userRoute = require('./routes/userRoute');
const { httpError } = require('./utils/errors');
const pooladmin = require('../database/db');
const promisePoolAdmin = pooladmin.promise();


app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'production') {
    require('./utils/production')(app, process.env.HTTP_PORT || 3000, process.env.HTTPS_PORT || 8000);
    const mariadbstatus = fs.readFileSync('/home/allseeyingeye/medialiapp/backend-rest/mariadbstatus.txt');
    const apachestatus = fs.readFileSync('/home/allseeyingeye/medialiapp/backend-rest/apachestatus.txt');
    const date = { d: Date.now() }
    const apachestatusfixed = apachestatus.toString().replace('●', '').replace('DFOREGROUND', '');

    const mariadbstatusfixed = mariadbstatus.toString().replace('●', '');

    const getUsersCountAdmin = async (next) => {
        try {
            const [rows] = await promisePoolAdmin.execute('SELECT COUNT(*) AS count FROM Users');
            console.log('count ', rows[0].count);
            return rows[0].count;
        } catch (e) {
            console.error('getUsersCountAdmin', e.message);
            next(httpError('Database error', 500));
        }
    };
    app.get('/', (req, res) => {

        res.render('status', {
            date: date.d,
            usercount: getUsersCountAdmin,
            mariadbstatus: mariadbstatusfixed,
            apachestatus: apachestatusfixed,
        });


    });
} else {
    require('./utils/localhost')(app, process.env.HTTP_PORT || 3000);
    const date = { d: Date.now() }
    app.get('/', (req, res) => {
        res.render('status', {
            date: date.d,
            usercount:'no data',
            mariadbstatus: 'no data available. this is localhost',
            apachestatus: 'no data available. this is localhost',
        });

    });
   
}

app.use('/users', userRoute );
// app.use((req, res, next) => {
//     const err = httpError('Not found', 404);
//     next(err);
// });








