'use strict';
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

const datenow = Date.now();
const date = [{'datenow': datenow}];
const {httpError} = require('../utils/errors');
const fs = require('fs');
const {route} = require('./authRoute');

router.get('/', function(req, res, next) {

  if (process.env.NODE_ENV === 'production') {
    const admin = require('../database/db');

    const mariadbstatus = fs.readFileSync(
        '/home/allseeyingeye/medialiapp/backend-rest/mariadbstatus.txt');
    const apachestatus = fs.readFileSync(
        '/home/allseeyingeye/medialiapp/backend-rest/apachestatus.txt');

    const apachestatusfixed = apachestatus.toString().
        includes('active (running)');

    const mariadbstatusfixed = mariadbstatus.toString().
        includes('active (running)');

    let location = process.env.NODE_ENV;

    admin.query(
        'SELECT * FROM `jakrecipes`.`allthecounts`;',
        function(err, result) {
          if (err) throw err;
          res.render('status/status', {
            date: date[0].datenow,
            location: location,
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
        },
    );

  } else {

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
    let location = process.env.NODE_ENV;

    local.query(
        'SELECT * FROM `jakrecipes`.`allthecounts`;',
        function(err, result) {
          if (err) throw err;

          res.render('status/status', {
            date: date[0].datenow,
            location: location,
            alluserscount: result[2].count,
            usercount: result[1].count,
            recipecount: result[0].count,
            reciperatingcount: result[8].count,
            commentcount: result[3].count,
            commentratingcount: result[6].count,
            imagecount: result[5].count,
            mariadbstatus: 'no data available. this is localhost',
            apachestatus: 'no data available. this is localhost',
          });

        });

  }

});
router.get('/mariadbstatus', function(req, res, next) {
  if (process.env.NODE_ENV === 'production') {
    const mariadbstatus = fs.readFileSync(
        '/home/allseeyingeye/medialiapp/backend-rest/mariadbstatus.txt');
    const mariadbstatusfixed = mariadbstatus.toString().
        includes('active (running)');

    const mariadbstatusfixedJson = [{'status': mariadbstatusfixed}];
    res.send(mariadbstatusfixedJson);
  } else {
    res.send('[{ "status":"no mariadb data available. this is localhost"}]');
  }
});
router.get('/apachestatus', function(req, res, next) {
  if (process.env.NODE_ENV === 'production') {
    const apachestatus = fs.readFileSync(
        '/home/allseeyingeye/medialiapp/backend-rest/apachestatus.txt');
    const apachestatusfixed = apachestatus.toString().
        includes('active (running)');
    const apachestatusfixedJson = [{'status': apachestatusfixed}];
    res.send(apachestatusfixedJson);
  } else {
    res.send('[{ "status":"no apache data available. this is localhost"}]');
  }

});
router.get('/alluserscount', function(req, res, next) {

      const admin = require('../database/db');
      admin.query(
          'SELECT COUNT(*) AS count FROM `jakrecipes`.`users`;',
          function(err, result) {
            if (err) throw err;
            res.send(result);
          },
      );

    },
);

router.get('/starttime', function(req, res, next) {
      res.send(date);
    },
);
module.exports = router;