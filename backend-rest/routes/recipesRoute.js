'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { httpError } = require('../utils/errors');
const path = require('path');

// sekalaisia numeroita tiedostonimien generointiin
const random = (Math.floor(Math.random() * 420) + 69);
const fileStorage = multer.diskStorage({
  // kohdekansio tiedostoille
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  // tiedostonimi määrittely
  filename: (req, file, cb) => {
    cb(null, Date.now() + random + path.extname(file.originalname));
  },

});
const upload = multer({
  storage: fileStorage,
  // ei hyväksy yli 100mb kokoisia tiedostoja
  limits: {
    fileSize: 100000000,
  },
  // suodattaan tiedostoja, jotta ne ovat vain kuvia
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },

});
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
  get_reguser_owned_recipes, recipes_put, get_user_owned_recipes, recipe_delete,
} = require('../controllers/recipesController');
const { body } = require('express-validator');

// ilman authentikointia
router.get('/mealtypes', recipes_mealtypes_get);
router.get('/newest', getAllNewestRecipesController);
router.get('/oldest', getAllOldestRecipesController);
router.get('/:id', recipe_get);
router.get('/filterrecipes/:recipename', filter_Recipes_By_Recipe_Name);
router.get('/filtercoursetypes/:coursetype', get_recipes_with_this_coursetype);
router.get('/filtermealtypes/:mealtype', get_recipes_with_this_mealtype);
router.get('/filterbyprice/:lowRecipePrice',
  get_recipes_with_this_low_recipe_price_to_0);
router.get('/comment/:id',
    body('id').escape(),
    comment_get);


// authentikoidun käyttäjän kanssa
router.get('/reguserprofile/:userid', get_reguser_owned_recipes);

router.get('/profile/:username',
    body('username').escape(),
    get_user_owned_recipes);


router.post('/',
  upload.single('recipeImage'),
  body('name').isLength({ min: 1 }).escape(),
  body('guide').isLength({ min: 1 }).escape(),
  body('course').isLength({ min: 1 }).escape(),
  body('time').escape(),
  body('price').optional({ checkFalsy: true }).isNumeric(),
  body('mealtypes').optional({ checkFalsy: true }).escape(),
  recipes_post);
router.put('/',
    upload.single('recipeImage'),
    body('name').isLength({ min: 1 }).escape(),
    body('guide').isLength({ min: 1 }).escape(),
    body('course').isLength({ min: 1 }).escape(),
    body('time').escape(),
    body('recipeid').isNumeric(),
    body('price').optional({ checkFalsy: true }).isNumeric(),
    body('mealtypes').optional({ checkFalsy: true }).escape(),

    recipes_put);

router.post('/comment',
  body('comment').isLength({ min: 1 }).escape(),
  body('recipeid').escape(),
  comment_post);
router.post('/comment/like/:id',
  body('id').escape(),
  comment_like)
router.post('/comment/dislike/:id',
  body('id').escape(),
  comment_dislike)
router.post('/addfavorite/:id',
  body('id').escape(),
  recipe_favorite);
router.post('/removefavorite/:id',
  body('id').escape(),
  recipe_removefavorite);
router.post('/like/:id',
  body('id').escape(),
  recipe_like)
router.post('/dislike/:id',
  body('id').escape(),
  recipe_dislike)
router.delete('/:id',
    body('id').escape(),
    recipe_delete)
module.exports = router;