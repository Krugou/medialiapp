'use strict';
const {
    getRecipeMealTypes, addRecipes,

} = require('../models/recipesModel');
const { getAllRecipesMainPage } = require('../models/normalUserModel');
const { validationResult } = require('express-validator');
const { httpError } = require('../utils/errors');
const sharp = require('sharp');

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
const recipes_post = async (req, res, next) => {
    try {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors.
            // Error messages can be returned in an array using `errors.array()`.
            console.error('user_post validation', errors.array());
            next(httpError('Invalid data', 400));
            return;
        }
        /*
        const thumbnail = await sharp(req.file.path).
        resize(160, 160).
        png().
        toFile('./thumbnails/' + req.file.filename);
*/

        const data = [
            req.body.name,
            req.body.guide,
            req.body.course,
            req.body.time,
           // req.user.user_id,
           req.body.mealtypes,
            req.file.filename,
        ];

        const result = await addRecipes(data, next);
        if (result.affectedRows < 1) {
            next(httpError('Invalid data', 400));
            return;
        }
        res.json({
            message: 'Recipe Added',
        });

        /*
        if (thumbnail) {
            res.json({
                message: 'Recipe Added',
            });
        }
        */
    }
    catch (e) {
        console.error('recipe_post', e.message);
        next(httpError('Internal server error', 500));
    }
    
}
/*
const cat_post = async (req, res, next) => {
    try {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors.
            // Error messages can be returned in an array using `errors.array()`.
            console.error('user_post validation', errors.array());
            next(httpError('Invalid data', 400));
            return;
        }

        console.log('cat_post', req.body, req.file);

        const thumbnail = await sharp(req.file.path).
        resize(160, 160).
        png().
        toFile('./thumbnails/' + req.file.filename);

        const coords = await getCoordinates(req.file.path);

        const data = [
            req.body.name,
            req.body.birthdate,
            req.body.weight,
            req.user.user_id,
            req.file.filename,
            JSON.stringify(coords),
        ];


        const result = await addCat(data, next);
        if (result.affectedRows < 1) {
            next(httpError('Invalid data', 400));
            return;
        }
        if (thumbnail) {
            res.json({
                message: 'cat added',
                cat_id: result.insertId,
            });
        }
    } catch (e) {
        console.error('cat_post', e.message);
        next(httpError('Internal server error', 500));
    }
};
*/

module.exports = {
    getAllRecipesController,
    recipes_mealtypes_get,
    recipes_post,
};


