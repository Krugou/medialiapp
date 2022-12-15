'use strict';
const express = require('express');
const router = express.Router();
const { httpError } = require('../utils/errors');
const path = require('path');

const {
    recipes_post,
    getAllNewestRecipesController,
    getAllOldestRecipesController,
    filter_Recipes_By_Recipe_Name,
    recipes_mealtypes_get,
    recipe_get,
    comment_post,
    comment_get,
    recipe_favorite,
    recipe_removefavorite,
    get_recipes_with_this_coursetype,
    get_recipes_with_this_mealtype,
    get_recipes_with_this_low_recipe_price_to_0,
    recipe_like,
    recipe_dislike,
    comment_like,
    comment_dislike,
    get_reguser_owned_recipes, recipes_put, get_user_owned_recipes, recipe_delete, comment_delete,
} = require('../controllers/recipesController');
const { body } = require('express-validator');

// ilman authentikointia
router.get('/mealtypes', recipes_mealtypes_get);
router.get('/newest', getAllNewestRecipesController);
router.get('/oldest', getAllOldestRecipesController);
router.get('/:id',
    body('id').escape(),
     recipe_get);
router.get('/filterrecipes/:recipename', filter_Recipes_By_Recipe_Name);
router.get('/filtercoursetypes/:coursetype', get_recipes_with_this_coursetype);
router.get('/filtermealtypes/:mealtype', get_recipes_with_this_mealtype);
router.get('/filterbyprice/:lowRecipePrice',
    get_recipes_with_this_low_recipe_price_to_0);
router.get('/comment/:id',
    body('id').escape(),
    comment_get);



module.exports = router;