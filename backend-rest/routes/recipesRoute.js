'use strict';
const express = require('express');
const router = express.Router();
const { recipes_list_get,
    recipes_count_get,
    recipes_post,
    recipes_list_by_category_get,
    recipes_list_by_author_get,
    recipes_list_by_id_get,
    recipes_put,
    recipes_delete,
    recipes_mealtypes_get,} = require("../controllers/recipesController");
const { body } = require('express-validator');
router.get('/mealtypes', recipes_mealtypes_get);
module.exports = router;