'use strict';
const {
  getRecipeMealTypes,
  addRecipes,
  getRecipeById,
  getMealtypeByRecipeId,
  getImageByRecipeId,
  getCoursetypeByCourseId, addFavorite, getFavorite, removeFavorite, addLike, addDislike, removePreviousRating,
  getReciperatingByUser, removePreviousReciperating,
} = require('../models/recipesModel');

const {
  getAllNewestRecipesMainPage,
  getAllOldestRecipesMainPage,
  getRecipesByRecipeName,

} = require('../models/normalUserModel');
const {
  getrecipeswiththiscoursetype,
  getrecipeswiththislowrecipepriceto0,
  getrecipeswiththismealtype,
} = require('../models/sortingModel');
const { validationResult } = require('express-validator');
const { httpError } = require('../utils/errors');
const sharp = require('sharp');
const {
  addComment,
  getRecipeCommentsByRecipe,
  getRecipeCommentRatingsByCommentId, removePreviousCommentrating, addCommentLike, addCommentDisLike,
} = require('../models/commentsModel');
const { findUsersByUseridRegUser } = require('../models/regUserModel');
const {getRecipeRatingByRecipe} = require("../models/ratingModel");

const get_recipes_with_this_coursetype = async (req, res, next) => {
  try {
    const recipesTable = await getrecipeswiththiscoursetype(req.params.coursetype, next);
    if (recipesTable.length < 1) {
      return next(httpError('No recipes found', 404));
    }
    res.json({ recipesTable });
  } catch (e) {
    console.error('get_recipes_with_this_coursetype', e.message);
    next(httpError('Database error', 500));

  }
};
const get_recipes_with_this_mealtype = async (req, res, next) => {
  try {
    const recipesTable = await getrecipeswiththismealtype(req.params.mealtype, next);
    if (recipesTable.length < 1) {
      return next(httpError('No recipes found', 404));
    }
    res.json({ recipesTable });
  } catch (e) {
    console.error('get_recipes_with_this_mealtype', e.message);
    next(httpError('Database error', 500));
  }
};
const get_recipes_with_this_low_recipe_price_to_0 = async (req, res, next) => {
  try {
    const recipesTable = await getrecipeswiththislowrecipepriceto0(req.params.lowRecipePrice, next);
    if (recipesTable.length < 1) {
      return next(httpError('No recipes found', 404));
    }
    res.json({ recipesTable });
  } catch (e) {
    console.error('get_recipes_with_this_low_recipe_price_to_0', e.message);
    next(httpError('Database error', 500));
  }
};
const recipe_get = async (req, res, next) => {
  let rows1, rows2, rows3, rows4, rows5, rows6, rows7;
  try {

    rows1 = await getRecipeById(req.params.id, next);
    const recipesCourse = rows1[0].Recipecourse;
    rows2 = await getMealtypeByRecipeId(req.params.id, next);
    rows3 = await getImageByRecipeId(req.params.id, next);
    rows4 = await getCoursetypeByCourseId(recipesCourse, next);

    if (!req.user) { // JOS käyttäjä on kirjautunut, katsotaan onko hän favoritannut tai arvostellut postauksen
      const favoriteData = [
        37,
        // req.user.Userid,
        req.params.id,
      ];
      rows5 = await getFavorite(favoriteData, next);
      rows5 = rows5.length >= 1; // True tai False, jos käyttäjä on favoritannut ko.
      rows6 = await getReciperatingByUser(favoriteData, next);
      rows6 = {
        value:rows6, //Onko reseptistä liketty vai disliketty
        find:rows6.length >= 1, // Onko Käyttäjä tehnyt kumpaakaan reseptille
      }
      //rows6  +=rows6.length >= 1; // True tai False, jos löytyy niin true
    }
    rows7 = await getRecipeRatingByRecipe(req.params.id, next);
    if (rows1.length < 1) {
      return next(httpError('No recipe found', 404));
    }

    if (rows2.length < 1) {
      rows2 = '';
    }
    if (rows3.length < 1) {
      rows3 = '';
    }
    if (rows4.length < 1) {
      rows4 = '';
    }

    res.json({
      recipes: rows1.pop(), //Ainoastaan yksi matchaava resepti, niin pop
      mealtypes: rows2, //Voi olla monta, niin ei pop
      images: rows3, //Voi olla tulevaisuudessa monta kuvaa, niin ei pop
      course: rows4.pop(), // Ainoastaan yksi course, niin pop
      favorite: rows5,
      rating:rows6,
      ratingsum:rows7.pop(),
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
    const recipesTable = await getRecipeMealTypes(next);
    if (recipesTable.length < 1) {
      next(httpError('No Mealtypes Found', 500));
    }
    res.json( recipesTable );
  } catch (e) {
    console.error('recipes_mealtypes_get', e.message);
    next(httpError('Internal server error', 500));
  }

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
const filter_Recipes_By_Recipe_Name = async (req, res, next) => {
  try {

    const recipesTable = await getRecipesByRecipeName(req.params.recipename,
      next);



    if (recipesTable.length < 1) {
      return next(httpError('No recipe found', 404));
    }

    res.json({ recipesTable });

  } catch (e) {
    console.error('filter recipes', e.message);
    next(httpError('Database error', 500));
  }
};
const comment_get = async (req, res, next) => {
  let findCommentRatings = []; // Tähän syötetään kommenttien tykkäykset.
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

    const findComments = await getRecipeCommentsByRecipe(req.params.id, next);
    if (findComments.length < 1) {
      return next(httpError('No comments found', 404));
    }

    for (let i = 0; i < findComments.length; i++) {
      const findCommentRatings2 = await getRecipeCommentRatingsByCommentId(
        findComments[i].Commentid, next); // Haetaan Kommenttien ideillä niiden arvostelut

      findComments[i] = {
        Commenttext: findComments[i].Commenttext,
        Username: findComments[i].Username,
        Commentrating: findCommentRatings2[0].dvalue,
        Commentid: findComments[i].Commentid,
      };
    }
    console.log(findComments);
    //const findCommentRatings = await getRecipeCommentRatingsByCommentId()
    // const getUserByUserId = await findUsersByUseridRegUser()
    res.json(findComments);

    /*
          res.json({
              recipes: rows1.pop(), //Ainoastaan yksi matchaava resepti, niin pop
              mealtypes: rows2, //Voi olla monta, niin ei pop
              images: rows3, //Voi olla tulevaisuudessa monta kuvaa, niin ei pop
              course: rows4.pop(), // Ainoastaan yksi course, niin pop
              favorite:rows5,
          });

     */
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
    ];
    const result = await addComment(data, next);
    if (result.affectedRows < 1) {
      next(httpError('Invalid data', 400));
      return;
    }
    res.json({
      message: 'Comment Added',
    });
  } catch (e) {
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
    console.log('req.user!', req.user);
    const data = [
      req.params.id,
      // req.user.Userid,
    ];
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
    console.log('req.user!', req.user);
    const data = [
      req.params.id,
      // req.user.Userid,
    ];
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
        sharp(req.file.path).
          resize({ width: size }).
          png().
          toFile('./thumbnails/' + req.file.filename + '_' + size + 'px.png');

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

};
const recipe_like = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors.
      // Error messages can be returned in an array using `errors.array()`.
      console.error('recipe_like validation', errors.array());
      res.json({
        message: 'Jokin meni pieleen',
      });
      next(httpError('Invalid data', 400));
      return;
    }
    const data = [
        37,
      // req.user.Userid,
      req.params.id,

    ];
    try {
      const removePrevious = await removePreviousReciperating(data, next);

    }
    catch (e) {

    }

    const result = await addLike(data, next);
    res.json({
      message: 'like Added',
    });
    if (result.affectedRows < 1) {
      next(httpError('Invalid data', 400));
    }
  }
  catch (e) {
    console.error('recipe_like', e.message);
    next(httpError('Internal server error', 500));
  }
}
const recipe_dislike = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors.
      // Error messages can be returned in an array using `errors.array()`.
      console.error('recipe_dislike validation', errors.array());
      res.json({
        message: 'Jokin meni pieleen',
      });
      next(httpError('Invalid data', 400));
      return;
    }
    const data = [
      37,
      // req.user.Userid,
      req.params.id,

    ];
    try {
      const removePrevious = await removePreviousReciperating(data, next);
    }
    catch (e) {

    }
    const result = await addDislike(data, next);
    res.json({
      message: 'dislike Added',
    });
    if (result.affectedRows < 1) {
      next(httpError('Invalid data', 400));
    }
  }
  catch (e) {
    console.error('recipe_dislike', e.message);
    next(httpError('Internal server error', 500));
  }
}
const comment_like = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors.
      // Error messages can be returned in an array using `errors.array()`.
      console.error('comment_like validation', errors.array());
      res.json({
        message: 'Jokin meni pieleen',
      });
      next(httpError('Invalid data', 400));
      return;
    }

    const data = [
      37, // OTA POIS KUN VALMIS
      // req.user.Userid,
      req.params.id,

    ];
    try {
      const removePrevious = await removePreviousCommentrating(data, next);
    }
    catch (e) {

    }
    const result = await addCommentLike(data, next);
    res.json({
      message: 'Like Added',
    });
    if (result.affectedRows < 1) {
      next(httpError('Invalid data', 400));
    }
  }

  catch (e) {
      console.error('comment_like', e.message);
      next(httpError('Internal server error', 500));
  }

}
const comment_dislike = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors.
      // Error messages can be returned in an array using `errors.array()`.
      console.error('comment_dislike validation', errors.array());
      res.json({
        message: 'Jokin meni pieleen',
      });
      next(httpError('Invalid data', 400));
      return;
    }

    const data = [
      37, // OTA POIS KUN VALMIS
      // req.user.Userid,
      req.params.id,

    ];
    try {
      const removePrevious = await removePreviousCommentrating(data, next);
    }
    catch (e) {

    }
    const result = await addCommentDisLike(data, next);
    res.json({
      message: 'Dislike Added',
    });
    if (result.affectedRows < 1) {
      next(httpError('Invalid data', 400));
    }
  }

  catch (e) {
    console.error('comment_dislike', e.message);
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
  get_recipes_with_this_coursetype,
  get_recipes_with_this_mealtype,
  get_recipes_with_this_low_recipe_price_to_0,
  recipe_like,
  recipe_dislike,
  comment_like,
  comment_dislike,
};


