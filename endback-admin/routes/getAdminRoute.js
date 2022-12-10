'use strict';
require('dotenv').config();
const express = require('express');
const datenow = Date.now()
const date = [{ "datenow": datenow }]
const fs = require('fs');
const router = express.Router();
const { getAdminDataCounts,
    getAdminDataUptime,
    getAdminDataAllusers,
    getAdminDataAllrecipeData,
    getAdminDataAllcommentswithauthors, } = require('../controllers/adminController');
router.get('/c', getAdminDataCounts);
router.get('/ut', getAdminDataUptime);
router.get('/au', getAdminDataAllusers);
router.get('/rd', getAdminDataAllrecipeData);
router.get('/co', getAdminDataAllcommentswithauthors);
const logic = 1 + 2;
router.get('/m', function (req, res, next) {
    if (process.env.NODE_ENV === 'production') {
        const mariadbstatus = fs.readFileSync('/home/allseeyingeye/medialiapp/backend-rest/mariadbstatus.txt');
        const mariadbstatusfixed = mariadbstatus.toString().includes("active (running)");

        const mariadbstatusfixedJson = [{ "status": mariadbstatusfixed }]
        res.send(mariadbstatusfixedJson);
    } else {
        res.send('[{ "status":" localhost"}]');
    }
});
router.get('/n', function (req, res, next) {
    if (logic === 3) {
        res.send('[{ "status":"node.js is running"}]');
    } else {
        res.send('[{ "status":"wtf is going on with node.js"}]');

    }
});
router.get('/a', function (req, res, next) {
    if (process.env.NODE_ENV === 'production') {
        const apachestatus = fs.readFileSync('/home/allseeyingeye/medialiapp/backend-rest/apachestatus.txt');
        const apachestatusfixed = apachestatus.toString().includes("active (running)");
        const apachestatusfixedJson = [{ "status": apachestatusfixed }]
        res.send(apachestatusfixedJson);
    } else {
        res.send('[{ "status":"localhost"}]');
    }

});


router.get('/n/s', function (req, res, next) {
    res.send(date)
}
);
module.exports = router;
