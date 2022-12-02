'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('front')


});
module.exports = router;