'use strict';
const { 
    getAllRecipesMainPage,
    getRecipeMealTypes,

} = require('../models/recipesModel');
const { validationResult } = require('express-validator');
const { httpError } = require('../utils/errors');

const getAllRecipesController = async (req, res, next) => {
    try {
        const rows = await getAllRecipesMainPage(next);
        if (rows.length < 1) {
            return next(httpError('No recipes found', 404));
        }
        res.json(rows);
    } catch (e) {
        console.error('getAllRecipesController', e.message);
        next(httpError('Database error', 500));
    }
};
const recipes_mealtypes_get = async (req, res, next) => {

    try {
        const result = await getRecipeMealTypes(next);
        if (result.length < 1) {
            next(httpError('No Mealtypes Found', 500));
        }
        res.json(result);
    }
    catch (e) {
        console.error('recipes_mealtypes_get', e.message);
        next(httpError('Internal server error', 500));
    }

};



module.exports = {
    getAllRecipesController,
    recipes_mealtypes_get,
};


