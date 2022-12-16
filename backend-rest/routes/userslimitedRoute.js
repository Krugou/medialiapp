'use strict';
const express = require('express');
const { user_post, getReg_UserDetails, getReg_UserDetailUsername, getReg_UserDetailImage, get_UserProfile, check_token,
  get_UserProfileLimited, deleteUsersReg_User, putNewProfileDetails
} = require('../controllers/userController');


const { body } = require('express-validator');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// ilman autentikointia (ei tokenia)
router.get('/profiledetails/image/:userid', getReg_UserDetailImage);
router.get('/profiledetails/username/:userid', getReg_UserDetailUsername);
router.get('/limited/:username',
  body('username').escape(),
  get_UserProfileLimited)

router.post('/',
    body('email').isEmail(),
    body('password').matches(/(?=.*\p{Lu}).{8,}/u),
    body('username').isLength({ min: 3 }).escape().matches(/^[a-zA-Z0-9]+$/),
    user_post)
module.exports = router;

