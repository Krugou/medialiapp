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
    const admin = require('./database/db');
    require('./utils/production')(app, process.env.HTTP_PORT || 3000, process.env.HTTPS_PORT || 8000);
    const mariadbstatus = fs.readFileSync('/home/allseeyingeye/medialiapp/backend-rest/mariadbstatus.txt');
    const apachestatus = fs.readFileSync('/home/allseeyingeye/medialiapp/backend-rest/apachestatus.txt');
    const date = { d: Date.now() }
    const apachestatusfixed =  apachestatus.toString().includes("active (running)");

    const mariadbstatusfixed = mariadbstatus.toString().includes("active (running)");
   

    app.get('/status', (req, res) => {

        admin.query(
            process.env.ADMIN_USERS_COUNT,
            function (err, result) {
                if (err) throw err;

                res.render('status', {
                    date: date.d,
                    usercount: result[0].count,
                    mariadbstatus: mariadbstatusfixed,
                    apachestatus: apachestatusfixed,
                });
            }
        );
    });
} else {
    const mysql = require('mysql2');
    require('./utils/localhost')(app, process.env.HTTP_PORT || 3000);
    const date = { d: Date.now() }
    app.get('/status', (req, res) => {
        const local = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            waitForConnections: true,
            multipleStatements: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
        
        local.query(
            'SELECT COUNT(*) AS count FROM Users where userrole = 1; ',
            [1,2], function (err, result) {
                if (err) throw err;
                res.render('status', {
                    date: date.d,
                    usercount: result[0].count,
                    // commentcount: result[3].count,
                    // recipecount: result[1].count,
                    // reciperatingcount: result[2].count,
                    // imagescount: result[5].count,
                    // commentratingcount: result[4].count,
                    mariadbstatus: 'no data available. this is localhost',
                    apachestatus: 'no data available. this is localhost',
                });
            });
    }
    );
};



app.use('/users', userRoute);
app.use((req, res, next) => {
    const err = httpError('Not found', 404);
    next(err);
});








