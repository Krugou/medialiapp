'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const userRoute = require('./routes/userRoute');
const { httpError } = require('./utils/errors');
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

   
    app.get('/status', (req, res) => {
        // get the client
        const mysql = require('mysql2');

        // create the connection to database
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER_ALL,
            password: process.env.DB_PASS_ALL,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });

        // simple query
        connection.query(
            'SELECT COUNT(*) AS count FROM Users',
            function (err, results, fields) {
                console.log(results); // results contains rows returned by server
                console.log(fields); // fields contains extra meta data about results, if available
            }
        );
        res.render('status', {
            date: date.d,
            usercount: results,
            mariadbstatus: mariadbstatusfixed,
            apachestatus: apachestatusfixed,
        });


    });
} else {
    require('./utils/localhost')(app, process.env.HTTP_PORT || 3000);
    const date = { d: Date.now() }
    app.get('/status', (req, res) => {
        res.render('status', {
            date: date.d,
            usercount: 'no data',
            mariadbstatus: 'no data available. this is localhost',
            apachestatus: 'no data available. this is localhost',
        });

    });

}

app.use('/users', userRoute);
// app.use((req, res, next) => {
//     const err = httpError('Not found', 404);
//     next(err);
// });








