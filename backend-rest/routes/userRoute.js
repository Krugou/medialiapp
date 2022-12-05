'use strict';
const express = require('express');
const { user_post } = require("../controllers/userController");
//const { user_count_admin_get, user_list_admin_get } = require("../controllers/adminController");
const {body} = require('express-validator');


const router = express.Router();

router.route('/')
    .post(body('email').isEmail(),
        body('password').matches(/(?=.*\p{Lu}).{8,}/u),
        user_post)
    //.get(user_list_admin_get);
router.route('/count')
   // .get(user_count_admin_get);






module.exports = router;


