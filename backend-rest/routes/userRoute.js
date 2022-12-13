'use strict';
const express = require('express');
const {user_post,getReg_UserDetails, getReg_UserDetailUsername, getReg_UserDetailImage, get_UserProfile, check_token,
    get_UserProfileLimited
} = require('../controllers/userController');
const {body} = require('express-validator');

const router = express.Router();
router.get('/profiledetails/image/:userid', getReg_UserDetailImage);
router.get('/profiledetails/username/:userid', getReg_UserDetailUsername);
router.route('/').post(body('email').isEmail(),
    body('password').matches(/(?=.*\p{Lu}).{8,}/u),
    body('username').isLength({min: 3}).escape(),
    user_post);
router.route('/count');


router.get('/limited/:username',
    body('username').escape(),
    get_UserProfileLimited)

//AUTHENTIKOINNILLA
router.get('/:username',
body('username').escape(),
get_UserProfile)
router.get('/token', check_token);



module.exports = router;


