'use strict';
const express = require('express');
const router = express.Router();
const {login} = require('../controllers/authController');
const {body} = require('express-validator');

router.post('/login', login);




module.exports = router;