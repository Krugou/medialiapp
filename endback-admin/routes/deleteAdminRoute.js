'use strict';
const express = require('express');
const router = express.Router();
const { delete_users,
    delete_comments,
    delete_recipes, } = require('../controllers/adminController'); //import the functions from the adminController file

const { body } = require('express-validator');

router.delete('/users/:id', body('id').escape(), delete_users); //define the route for deleting a user, and pass the function from the adminController file
router.delete('/comments/:id', body('id').escape(), delete_comments); //define the route for deleting a comment, and pass the function from the adminController file
router.delete('/recipes/:id', body('id').escape(), delete_recipes); //define the route for deleting a recipe, and pass the function from the adminController file


module.exports = router;