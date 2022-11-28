'use strict';
const express = require('express');
const {user_post} = require("../controllers/userController");
const router = express.Router();

router.route('/')
    .put(user_post);




module.exports = router;


