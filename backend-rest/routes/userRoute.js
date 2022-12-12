'use strict';
const express = require('express');
const {user_post,getReg_UserDetails, getReg_UserDetailUsername, getReg_UserDetailImage} = require('../controllers/userController');
const {body} = require('express-validator');

const router = express.Router();
router.get('/profiledetails/image/:userid', getReg_UserDetailImage);
router.get('/profiledetails/username/:userid', getReg_UserDetailUsername);
router.route('/').post(body('email').isEmail(),
    body('password').matches(/(?=.*\p{Lu}).{8,}/u),
    body('username').isLength({min: 3}).escape(),
    user_post);
router.route('/count');

module.exports = router;


