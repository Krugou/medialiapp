'use strict';
const {
    getRecipeMealTypes,
    addRecipes,
    getRecipeById,
    getMealtypeByRecipeId,
    getImageByRecipeId,
    getCoursetypeByRecipeId
} = require('../models/recipesModel');

const {
    getAllNewestRecipesMainPage,
    getAllOldestRecipesMainPage,
    getRecipesByRecipeName,

} = require('../models/normalUserModel');
const { validationResult } = require('express-validator');
const { httpError } = require('../utils/errors');
const sharp = require('sharp');


const recipe_get = async (req, res, next) => {
    let rows1, rows2, rows3;
    try {
        rows1 = await getRecipeById(req.params.id, next);
        rows2 = await getMealtypeByRecipeId(req.params.id, next);
        rows3 = await getImageByRecipeId(req.params.id, next);
        if (rows1.length < 1) {
            return next(httpError('No recipe found', 404));
        }

        if (rows2.length < 1) {
            rows2 = "";
        }
        if (rows3.length < 1) {
            rows3 = "";
        }

        res.json({
            recipes: rows1.pop(),
            mealtypes: rows2,
            Images: rows3,
        });

    } catch (e) {
        console.error('recipe_get', e.message);
        next(httpError('Database error', 500));
    }
    /*
            if (rows2.length>5) {
                console.log("asd");
                res.json({
                    recipes: rows1.pop(),
                    mealtypes: rows2
                });
            }

     */

};
const recipes_mealtypes_get = async (req, res, next) => {

    try {
        const result = await getRecipeMealTypes(next);
        if (result.length < 1) {
            next(httpError('No Mealtypes Found', 500));
        }
        res.json(result);
    } catch (e) {
        console.error('recipes_mealtypes_get', e.message);
        next(httpError('Internal server error', 500));
    }

};
let combinedTable = [];
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
const filter_Recipes_By_Recipe_Name = async (req, res, next) => {
    try {
        
        let recipesTable = await getRecipesByRecipeName(req.params.recipename, next);
        for (let i = 0; i < recipesTable.length; i++) {
            const courseTable = await getCoursetypeByRecipeId(recipesTable[i].Recipecourse, next);
            const imagesTable = await getImageByRecipeId(recipesTable[i].Recipeid, next);
            const mealtypesTable = await getMealtypeByRecipeId(recipesTable[i].Recipeid, next);
            recipesTable[i].Course = courseTable;
            recipesTable[i].Images = imagesTable
            recipesTable[i].Mealtypes = mealtypesTable;
        }

        if (recipesTable.length < 1) {
            return next(httpError('No recipe found', 404));
        }

      
        res.json({recipesTable   });
     

    } catch (e) {
        console.error('filter recipes', e.message);
        next(httpError('Database error', 500));
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
        const thumbnailSizes = [160, 200, 300, 400, 500];
        if (req.file) {

            await thumbnailSizes.forEach(size => {
                sharp(req.file.path).resize({ width: size }).png().toFile('./thumbnails/' + req.file.filename + '_' + size + 'px.png');

            });


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
    } catch (e) {
        console.error('recipes_post', e.message);
        next(httpError('Internal server error', 500));
    }

}


module.exports = {
    getAllNewestRecipesController,
    getAllOldestRecipesController,
    recipes_mealtypes_get,
    recipes_post,
    recipe_get,
    filter_Recipes_By_Recipe_Name,
};


