'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const userRoute = require('./routes/userRoute');
const { httpError } = require('./utils/errors');
const local = require('./database/db');
const admin = require('./database/db');
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
    require('./utils/localhost')(app, process.env.HTTP_PORT || 3000);
    const date = { d: Date.now() }
    app.get('/status', (req, res) => {
      
        local.query(
            process.env.ADMIN_USERS_COUNT,
            function (err, result) {
                if (err) throw err;
                res.render('status', {
                    date: date.d,
                    usercount: result[0].count,
                    mariadbstatus: 'no data available. this is localhost',
                    apachestatus: 'no data available. this is localhost',
                });
                
            }); 
        
    }
    );
    

};



app.use('/users', userRoute);
// app.use((req, res, next) => {
//     const err = httpError('Not found', 404);
//     next(err);
// });








