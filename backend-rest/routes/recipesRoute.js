'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');
const {httpError} = require("../utils/errors");


const fileFilter = (req, file, cb) => {
    if (file.mimetype.includes('image')) {
        cb(null, true);
    } else {
        cb(httpError('Invalid file', 400));

    }
}


const upload = multer({dest: 'uploads/', fileFilter});
const { recipes_list_get,
    recipes_count_get,
    recipes_post,
    recipes_list_by_category_get,
    recipes_list_by_author_get,
    recipes_list_by_id_get,
    recipes_put,
    recipes_delete,
    getAllRecipesController,
    recipes_mealtypes_get,} = require("../controllers/recipesController");
const { body } = require('express-validator');
router.get('/mealtypes', recipes_mealtypes_get);
router.get('/allrecipes', getAllRecipesController );
router.post('/',
 upload.single('recipe'),

     body('name').isLength({min: 1}).escape(),
    body('guide').isLength({min: 1}).escape(),
    body('course').isLength({min: 1}).escape(),
    body('time').escape(),
    //body('mealtypes').escape,


    recipes_post);

module.exports = router;