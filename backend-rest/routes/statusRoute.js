'use strict';
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

const fs = require('fs');
router.get('/', function (req, res, next) {

   

    if (process.env.NODE_ENV === 'production') {
        const admin = require('../database/db');
      
        const mariadbstatus = fs.readFileSync('/home/allseeyingeye/medialiapp/backend-rest/mariadbstatus.txt');
        const apachestatus = fs.readFileSync('/home/allseeyingeye/medialiapp/backend-rest/apachestatus.txt');
        const date = { d: Date.now() }
        const apachestatusfixed = apachestatus.toString().includes("active (running)");


        const mariadbstatusfixed = mariadbstatus.toString().includes("active (running)");

        

            admin.query(
                'SELECT * FROM `jakrecipes`.`allthecounts`;',
                function (err, result) {
                    if (err) throw err;

                    res.render('status', {
                        date: date.d,
                        alluserscount: result[2].count,
                        usercount: result[1].count,
                        recipecount: result[0].count,
                        reciperatingcount: result[8].count,
                        commentcount: result[3].count,
                        commentratingcount: result[6].count,
                        imagecount: result[5].count,
                        mariadbstatus: mariadbstatusfixed,
                        apachestatus: apachestatusfixed,
                    });
                }
            );

       
    } else {
        

        const date = { d: Date.now() }
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
                'SELECT * FROM `jakrecipes`.`allthecounts`;',
                [1, 2], function (err, result) {
                    if (err) throw err;

                    res.render('status', {
                        date: date.d,
                        alluserscount: result[2].count,
                        usercount: result[1].count,
                        recipecount: result[0].count,
                        reciperatingcount: result[8].count,
                        commentcount: result[3].count,
                        commentratingcount: result[6].count,
                        imagecount: result[5].count,
                        mariadbstatus: 'no data available. this is localhost',
                        apachestatus: 'no data available. this is localhost',
                    })

                })


     
    };
});

module.exports = router;