'use strict';
const {
    getRecipeMealTypes, addRecipes, getRecipe, getMealtypeById
} = require('../models/recipesModel');
const { getAllNewestRecipesMainPage, getAllOldestRecipesMainPage } = require('../models/normalUserModel');
const { validationResult } = require('express-validator');
const { httpError } = require('../utils/errors');
const sharp = require('sharp');


const recipe_get = async (req, res, next) => {
    let rows1, rows2;
    try {
         rows1 = await getRecipe(req.params.id, next);
        if (rows1.length < 1) {
            return next(httpError('No recipe found', 404));
        }
    } catch (e) {
        console.error('recipe_get', e.message);
        next(httpError('Internal server error', 500));
    }

    try {
         rows2 = await getMealtypeById(req.params.id, next);
        if (rows2.length < 1) {
            return next(httpError('No recipe found', 404));
        }
    } catch (e) {
        console.error('recipe_get', e.message);
        next(httpError('Internal server error', 500));
    }

    res.json({
        recipes:rows1.pop(),
        mealtypes:rows2
        });
};



const getAllNewestRecipesController = async (req, res, next) => {
    try {
        const rows = await getAllNewestRecipesMainPage(next);
        if (rows.length < 1) {
            return next(httpError('No recipes found', 404));
        }
        res.json(rows);
    } catch (e) {
        console.error('getAllRecipesController', e.message);
        next(httpError('Database error', 500));
    }
};
const getAllOldestRecipesController = async (req, res, next) => {
    try {
        const rows = await getAllOldestRecipesMainPage(next);
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
            res.json({
                message: 'Täytä vaaditut kentät',
            });
            return;
        }
        if (req.file) {
            const thumbnail = await sharp(req.file.path).resize(160, 160).png().toFile('./thumbnails/' + req.file.filename);
        }
        let data = [];
        if (req.file) {
            data = [
                req.body.name,
                req.body.guide,
                req.body.course,
                req.body.time,
                // req.user.user_id,
                req.body.mealtypes,
                req.file.filename,
            ];
        } else {
            data = [
                req.body.name,
                req.body.guide,
                req.body.course,
                req.body.time,
                // req.user.user_id,
                req.body.mealtypes,
            ];
        }
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
        console.error('recipes_post', e.message);
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
    getAllNewestRecipesController,
    getAllOldestRecipesController,
    recipes_mealtypes_get,
    recipes_post,
    recipe_get,
};


