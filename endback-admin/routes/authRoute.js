'use strict';
const express = require('express');
const router = express.Router();
const {login} = require('../controllers/authController');
const { body } = require('express-validator');
const { check_token } = require('../controllers/authController');

router.post('/login', login);
router.get('/token', check_token);

module.exports = router;