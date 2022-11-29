'use strict';
const express = require('express');
const {user_post, user_list_admin_get,
    user_count_admin_get, } = require("../controllers/userController");
const {body} = require('express-validator');


const router = express.Router();

router.route('/')
    .post(body('email').isEmail(),
        body('password').matches(/(?=.*\p{Lu}).{8,}/u),
        user_post)
    .get(user_list_admin_get);
router.route('/count')
    .get(user_count_admin_get);






module.exports = router;


