'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { httpError } = require("../utils/errors");
const path = require('path');

// sekalaisia numeroita tiedostonimien generointiin
const random = (Math.floor(Math.random() * 420) + 69)
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
        fileSize: 100000000
    },
    // suodattaan tiedostoja, jotta ne ovat vain kuvia
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }

});
const {
    recipes_post,
    getAllNewestRecipesController,
    getAllOldestRecipesController,
    filter_Recipes_By_Recipe_Name,
    recipes_mealtypes_get,
    recipe_get,
    comment_post,
    comment_get,} = require("../controllers/recipesController");
const { body } = require('express-validator');
router.get('/mealtypes', recipes_mealtypes_get);
router.get('/allrecipes/newest', getAllNewestRecipesController);
router.get('/allrecipes/oldest', getAllOldestRecipesController);
router.get('/:id', recipe_get);
router.get('/filterrecipes/:recipename', filter_Recipes_By_Recipe_Name);
router.get('/comment/:id',
    body("id").escape(),
    comment_get);
router.post('/',
    upload.single('recipeImage'),
    body('name').isLength({ min: 1 }).escape(),
    body('guide').isLength({ min: 1 }).escape(),
    body('course').isLength({ min: 1 }).escape(),
    body('time').escape(),
    body('price').optional({ checkFalsy: true }).isNumeric(),
    body('mealtypes').optional({ checkFalsy: true }).escape(),
    recipes_post);
router.post('/comment',
    body("comment").isLength({ min: 1 }).escape(),
    body("recipeid").escape(),
        comment_post)
module.exports = router;