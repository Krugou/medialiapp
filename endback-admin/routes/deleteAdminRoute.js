'use strict';
const express = require('express');
const router = express.Router();
const { delete_users,
    delete_comments,
    delete_recipes, } = require('../controllers/adminController');



router.delete('/users/:userid', delete_users);
router.delete('/comments/:commentid', delete_comments);
router.delete('/recipes/:recipeid', delete_recipes);


module.exports = router;