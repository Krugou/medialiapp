'use strict';
const { getAllRecipes,
    getRecipesCount,
    addRecipes,
    findRecipesByName,
    findRecipesByCategory,
    findRecipesByAuthor,
    findRecipesById,
    updateRecipes,
    deleteRecipes } = require('../models/recipesModel');
const { validationResult } = require('express-validator');
const { httpError } = require('../utils/errors');

const recipes_list_get = async (req, res, next) => {
    try {
        const recipes = await getAllRecipes(next);
        if (recipes.length < 1) {
            next(httpError('No recipes found', 404));
        }
        res.json(recipes);
    } catch (e) {
        console.error('recipes_list_get', e.message);
        next(httpError('Internal server error', 500));
    }
}

const recipes_count_get = async (req, res, next) => {
    try {
        const count = await getRecipesCount(next);
        res.json(count);
    } catch (e) {
        console.error('recipes_count_get', e.message);
        next(httpError('Internal server error', 500));
    }
}

const recipes_post = async (req, res, next) => {
    try {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors.
            // Error messages can be returned in an array using `errors.array()`.
            console.error('recipes_post validation', errors.array());
            next(httpError('Invalid data', 400));
            res.json({
                message: 'Check name and category again',
            });
            return;
        }

        const data = [
            req.body.name,
            req.body.category,
            req.body.author,
            req.body.ingredients,
            req.body.instructions,
        ];

        const resultFind = await findRecipesByName(data[0]);
        console.log(resultFind);

        if (resultFind.length > 0) {
            next(httpError('Recipe name is already in use', 400));
            res.json({
                message: 'Recipe name is already in use',
            });
            return;
        }

        const result = await addRecipes(data, next);
        if (result.affectedRows < 1) {
            next(httpError('Invalid data', 400));
        }

        res.json({
            message: 'Recipe Created',
        });
    } catch (e) {
        console.error('recipes_post', e.message);
        next(httpError('Internal server error', 500));
    }
}

const recipes_list_by_category_get = async (req, res, next) => {

    try {
        const recipes = await findRecipesByCategory(req.params.category, next);
        if (recipes.length < 1) {
            next(httpError('No recipes found', 404));
        }
        res.json(recipes);
    } catch (e) {
        console.error('recipes_list_by_category_get', e.message);
        next(httpError('Internal server error', 500));
    }
}

const recipes_list_by_author_get = async (req, res, next) => {
    
        try {
            const recipes = await findRecipesByAuthor(req.params.author, next);
            if (recipes.length < 1) {
                next(httpError('No recipes found', 404));
            }
            res.json(recipes);
        } catch (e) {
            console.error('recipes_list_by_author_get', e.message);
            next(httpError('Internal server error', 500));
        }
}

const recipes_list_by_id_get = async (req, res, next) => {
    
        try {
            const recipes = await findRecipesById(req.params.id, next);
            if (recipes.length < 1) {
                next(httpError('No recipes found', 404));
            }
            res.json(recipes);
        } catch (e) {
            console.error('recipes_list_by_id_get', e.message);
            next(httpError('Internal server error', 500));
        }
}

const recipes_put = async (req, res, next) => {
    try {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors.
            // Error messages can be returned in an array using `errors.array()`.
            console.error('recipes_put validation', errors.array());
            next(httpError('Invalid data', 400));
            res.json({
                message: 'Check name and category again',
            });
            return;
        }

        const data = [
            req.body.name,
            req.body.category,
            req.body.author,
            req.body.ingredients,
            req.body.instructions,
            req.params.id,
        ];

        const resultFind = await findRecipesByName(data[0]);
        console.log(resultFind);

        if (resultFind.length > 0) {
            next(httpError('Recipe name is already in use', 400));
            res.json({
                message: 'Recipe name is already in use',
            });
            return;
        }

        const result = await updateRecipes(data, next);
        if (result.affectedRows < 1) {
            next(httpError('Invalid data', 400));
        }

        res.json({
            message: 'Recipe Updated',
        });
    } catch (e) {
        console.error('recipes_put', e.message);
        next(httpError('Internal server error', 500));
    }
}

const recipes_delete = async (req, res, next) => {
    try {
        const result = await deleteRecipes(req.params.id, next);
        if (result.affectedRows < 1) {
            next(httpError('Invalid data', 400));
        }
        res.json({
            message: 'Recipe Deleted',
        });
    } catch (e) {
        console.error('recipes_delete', e.message);
        next(httpError('Internal server error', 500));
    }
}

module.exports = {
    recipes_list_get,
    recipes_count_get,
    recipes_post,
    recipes_list_by_category_get,
    recipes_list_by_author_get,
    recipes_list_by_id_get,
    recipes_put,
    recipes_delete,
};

    
