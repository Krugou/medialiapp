'use strict';
const express = require('express');
const { user_post } = require("../controllers/userController");
const {body} = require('express-validator');


const router = express.Router();

router.route('/')
    .post(body('email').isEmail(),
        body('password').matches(/(?=.*\p{Lu}).{8,}/u),
        body('username').isLength({ min: 3 }).escape(),
        user_post)
router.route('/count')






module.exports = router;


