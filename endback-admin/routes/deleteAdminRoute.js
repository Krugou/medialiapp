'use strict';
const express = require('express');
const router = express.Router();
const { delete_users,
    delete_comments,
    delete_recipes, } = require('../controllers/adminController');

const { body } = require('express-validator');

router.delete('/users/:id', body('id').escape(), delete_users);
router.delete('/comments/:id', body('id').escape(), delete_comments);
router.delete('/recipes/:id', body('id').escape(), delete_recipes);


module.exports = router;