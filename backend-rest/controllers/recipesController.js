'use strict';
const {
    getRecipeMealTypes,
    addRecipes,
    getRecipeById,
    getMealtypeByRecipeId,
    getImageByRecipeId,
    getCoursetypeByCourseId, addFavorite, getFavorite, removeFavorite
} = require('../models/recipesModel');

const {
    getAllNewestRecipesMainPage,
    getAllOldestRecipesMainPage,
    getRecipesByRecipeName,

} = require('../models/normalUserModel');
const { validationResult } = require('express-validator');
const { httpError } = require('../utils/errors');
const sharp = require('sharp');
const {addComment, getRecipeCommentsByRecipe} = require("../models/commentsModel");
const {findUsersByUseridRegUser} = require("../models/regUserModel");


const recipe_get = async (req, res, next) => {
    let rows1, rows2, rows3, rows4, rows5;
    try {

        rows1 = await getRecipeById(req.params.id, next);
        const recipesCourse = rows1[0].Recipecourse;
        rows2 = await getMealtypeByRecipeId(req.params.id, next);
        rows3 = await getImageByRecipeId(req.params.id, next);
        rows4 = await getCoursetypeByCourseId(recipesCourse, next);

        if (!req.user) { // JOS käyttäjä on kirjautunut, katsotaan onko hän favoritannut postauksen
            const favoriteData = [
                37,
               // req.user.Userid,
                req.params.id,
            ]
            rows5 = await getFavorite(favoriteData, next);
            rows5 = rows5.length >= 1;
        }
        if (rows1.length < 1) {
            return next(httpError('No recipe found', 404));
        }

        if (rows2.length < 1) {
            rows2 = "";
        }
        if (rows3.length < 1) {
            rows3 = "";
        }
        if (rows4.length < 1) {
            rows4 = "";
        }

        res.json({
            recipes: rows1.pop(), //Ainoastaan yksi matchaava resepti, niin pop
            mealtypes: rows2, //Voi olla monta, niin ei pop
            images: rows3, //Voi olla tulevaisuudessa monta kuvaa, niin ei pop
            course: rows4.pop(), // Ainoastaan yksi course, niin pop
            favorite:rows5,
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
            const courseTable = await getCoursetypeByCourseId(recipesTable[i].Recipecourse, next);
            const imagesTable = await getImageByRecipeId(recipesTable[i].Recipeid, next);
            const mealtypesTable = await getMealtypeByRecipeId(recipesTable[i].Recipeid, next);
            
            if (courseTable.length < 1) {
                recipesTable[i].Coursetype = "";
            } else {
                recipesTable[i].Coursetype = courseTable[0]['Coursetype']

            }
            if (imagesTable.length < 1) {
                recipesTable[i].Imagefilepath = "";
            } else {
                recipesTable[i].Imagefilepath = imagesTable[0]['Imagefilepath']
            }

            if (mealtypesTable.length < 1) {
                recipesTable[i].Mealtype = "";
            } else {
                recipesTable[i].Mealtype = mealtypesTable[0]['Mealtype']
            }

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
const comment_get = async  (req, res, next) => {
  try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
          // There are errors.
          // Error messages can be returned in an array using `errors.array()`.
          console.error('comment_get validation', errors.array());
          res.json({
              message: 'Jokin meni pieleen',
          });
          next(httpError('Invalid data', 400));
          return;
      }

      const findComments = await getRecipeCommentsByRecipe(req.params.id, next)
      if (findComments.length < 1) {
          return next(httpError('No comments found', 404));
      }
     // const getUserByUserId = await findUsersByUseridRegUser()



      res.json(findComments);
  } catch (e) {
      console.error('comment_get', e.message);
      next(httpError('Database error', 500));
  }
  };



const comment_post = async (req, res, next) => {
    try {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors.
            // Error messages can be returned in an array using `errors.array()`.
            console.error('comment_post validation', errors.array());
            next(httpError('Invalid data', 400));
            res.json({
                message: 'Virheellinen syöte',
            });
            return;
        }
        const data = [
            req.body.comment,
            req.body.recipeid,
            //req.user.user_id,  // EI käytetä vielä, koska ei jaksa kirjautua sisään joka kerta ku demoaa
        ]
        const result = await addComment(data, next);
        if (result.affectedRows < 1) {
            next(httpError('Invalid data', 400));
            return;
        }
        res.json({
            message: 'Comment Added',
        });
    }
    catch (e) {
        console.error('comment_post', e.message);
        next(httpError('Internal server error', 500));
    }

};

const recipe_favorite = async (req, res, next) => {
    try {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors.
            // Error messages can be returned in an array using `errors.array()`.
            console.error('recipe_favorite validation', errors.array());
            res.json({
                message: 'Jokin meni pieleen',
            });
            next(httpError('Invalid data', 400));
            return;
        }
        console.log("req.user!",req.user);
        const data = [
            req.params.id,
           // req.user.Userid,
        ]
        const result = await addFavorite(data, next);
        if (result.affectedRows < 1) {
            next(httpError('Invalid data', 400));
            return;
        }
        res.json({
            message: 'Recipe Favorited',
        });


    } catch (e) {
        console.error('recipe_favorite', e.message);
        next(httpError('Internal server error', 500));
    }
};
const recipe_removefavorite = async (req, res, next) => {
    try {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors.
            // Error messages can be returned in an array using `errors.array()`.
            console.error('recipe_removefavorite validation', errors.array());
            res.json({
                message: 'Jokin meni pieleen',
            });
            next(httpError('Invalid data', 400));
            return;
        }
        console.log("req.user!",req.user);
        const data = [
            req.params.id,
            // req.user.Userid,
        ]
        const result = await removeFavorite(data, next);
        if (result.affectedRows < 1) {
            next(httpError('Invalid data', 400));
            return;
        }
        res.json({
            message: 'Favorite removed',
        });


    } catch (e) {
        console.error('recipe_favorite', e.message);
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
            res.json({
                message: 'Täytä vaaditut kentät',
            });
            next(httpError('Invalid data', 400));
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
                req.body.price,
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
                req.body.price,
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
    comment_post,
    comment_get,
    recipe_favorite,
    recipe_removefavorite,
};


