const express = require('express');
const { recipes_list_get,
    recipes_count_get,
    recipes_post,
    recipes_list_by_category_get,
    recipes_list_by_author_get,
    recipes_list_by_id_get,
    recipes_put,
    recipes_delete, } = require("../controllers/recipesController");
const { body } = require('express-validator');

