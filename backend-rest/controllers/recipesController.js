'use strict';
const {
    getRecipeMealTypes,
    addRecipes,
    getRecipeById,
    getMealtypeByRecipeId,
    getImageByRecipeId,
    getCoursetypeByCourseId, addFavorite, getFavorite, removeFavorite, addLike, addDislike, removePreviousRating,
    getReciperatingByUser, removePreviousReciperating, modifyRecipes, findRecipesByAuthorId, verifyRecipeOwnership,
    deleteRecipe, deleteRecipeAdmin, getRecipemaker, getRecipemakerImage, modifyRecipesAdmin,
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
    getuserfavorites,
    getmostlikedrecipes,
} = require('../models/sortingModel');
const {validationResult} = require('express-validator');
const {httpError} = require('../utils/errors');
const sharp = require('sharp');
const {
    addComment,
    getRecipeCommentsByRecipe,
    getRecipeCommentRatingsByCommentId, removePreviousCommentrating, addCommentLike, addCommentDisLike,
    getCommentratingByUserid, deleteCommentAdmin, verifyCommentOwnership, deleteComment,
} = require('../models/commentsModel');
const {
    getReguserOwnedRecipes,
    getReguserOwnedRecipes2,
    getReguserOwnedRecipess,
    getReguserOwnedRecipesNew,
} = require('../models/regUserModel');
const {getRecipeRatingByRecipe} = require("../models/ratingModel");

const get_mostlikedrecipes = async (req, res, next) => {
    try {
        const recipesTable = await getmostlikedrecipes(next);
        if (recipesTable.length < 1) {
            return next(httpError('No recipes found', 404));
        }

        res.json({recipesTable});
    } catch (e) {
        console.error('get_mostlikedrecipes', e.message);
        next(httpError('Database error', 500));
    }
};

const get_recipes_with_this_coursetype = async (req, res, next) => {
    try {
        const recipesTable = await getrecipeswiththiscoursetype(req.params.coursetype, next);
        if (recipesTable.length < 1) {
            return next(httpError('No recipes found', 404));
        }
        res.json({recipesTable});
    } catch (e) {
        console.error('get_recipes_with_this_coursetype', e.message);
        next(httpError('Database error', 500));

    }
};
const get_user_favorites = async (req, res, next) => {
    try {
        const recipesTable = await getuserfavorites(req.params.id, next);
        if (recipesTable.length < 1) {
            return next(httpError('No recipes found', 404));
        }
        if (recipesTable.length < 1) {
            res.json({
                message: "Suosikeita ei löytynyt"
            });

        }
        res.json({recipesTable});
    } catch (e) {
        console.error('get_user_favorites', e.message);
        next(httpError('Database error', 500));
    }
};
const get_reguser_owned_recipes = async (req, res, next) => {
    try {
        const recipesTable = await getReguserOwnedRecipes(req.params.userid, next);
        if (recipesTable.length < 1) {
            return next(httpError('No recipes found', 404));
        }
        res.json({recipesTable});
    } catch (e) {
        console.error('get_reguser_owned_recipes', e.message);
        next(httpError('Database error', 500));
    }
};
const get_user_owned_recipes = async (req, res, next) => {
    console.log(req.params.username);
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors.
            // Error messages can be returned in an array using `errors.array()`.
            console.error('get_user_owned_recipes validation', errors.array());
            res.json({
                message: 'Jokin meni pieleen',
            });
            next(httpError('Invalid data', 400));
            return;
        }

        const recipesTable = await getReguserOwnedRecipesNew(req.params.username, next);
        console.log("recipestable", recipesTable);
        if (recipesTable.length < 1) {
            return next(httpError('No recipes found', 404));
        }
        res.json({recipesTable});
    } catch (e) {
        console.error('get_user_owned_recipes', e.message);
        next(httpError('Database error', 500));
    }
};
const get_recipes_with_this_mealtype = async (req, res, next) => {
    try {
        const recipesTable = await getrecipeswiththismealtype(req.params.mealtype, next);
        if (recipesTable.length < 1) {
            return next(httpError('No recipes found', 404));
        }
        res.json({recipesTable});
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
        res.json({recipesTable});
    } catch (e) {
        console.error('get_recipes_with_this_low_recipe_price_to_0', e.message);
        next(httpError('Database error', 500));
    }
};
const recipe_get = async (req, res, next) => {
    let rows1, rows2, rows3, rows4, rows5, rows6, rows7, rows8, rows9;
    try {

        rows1 = await getRecipeById(req.params.id, next);
        const recipesCourse = rows1[0].Recipecourse;
        rows2 = await getMealtypeByRecipeId(req.params.id, next);
        rows3 = await getImageByRecipeId(req.params.id, next);
        rows4 = await getCoursetypeByCourseId(recipesCourse, next);


        rows7 = await getRecipeRatingByRecipe(req.params.id, next);
        rows8 = await getRecipemaker(req.params.id, next);
        // Haetaan kuva erikseen, koska sitä välttämättä ei ole, sen takia tarvitaan myös try catch
        try {
            console.log("rows8", rows8[0].Userimg);
            rows9 = await getRecipemakerImage(rows8[0].Userimg, next);

        } catch (e) {
            next(httpError('No Image found', 404));
        }
        if (rows1.length < 1) {
            return next(httpError('No recipe found', 404));
        }

        if (rows2.length < 1) {
            rows2 = '';
        }
        if (rows3.length < 1) {
            rows3 = false;
        }
        if (rows4.length < 1) {
            rows4 = '';
        }
        console.log("rows8", rows8);
        res.json({
            recipes: rows1.pop(), //Ainoastaan yksi matchaava resepti, niin pop
            mealtypes: rows2, //Voi olla monta, niin ei pop
            images: rows3,
            course: rows4.pop(), // Ainoastaan yksi course, niin pop
            ratingsum: rows7.pop(),
            author: rows8.pop(),
            authorimg: rows9.pop(),
        });

    } catch (e) {
        console.error('recipe_get', e.message);
        next(httpError('Database error', 500));
    }
};
const recipe_getloggedinuser = async (req, res, next) => {
    let rows1, rows2, rows3, rows4, rows5, rows6, rows7, rows8, rows9;
    try {

        rows1 = await getRecipeById(req.params.id, next);
        const recipesCourse = rows1[0].Recipecourse;
        rows2 = await getMealtypeByRecipeId(req.params.id, next);
        rows3 = await getImageByRecipeId(req.params.id, next);
        rows4 = await getCoursetypeByCourseId(recipesCourse, next);

        // käyttäjä on kirjautunut, katsotaan onko hän favoritannut tai arvostellut postauksen ota ! pois kun valmis
        const favoriteData = [
            req.user.Userid,
            req.params.id,
        ];
        rows5 = await getFavorite(favoriteData, next);
        rows5 = rows5.length >= 1; // True tai False, jos käyttäjä on favoritannut ko.
        rows6 = await getReciperatingByUser(favoriteData, next);
        rows6 = {
            value: rows6, //Onko reseptistä liketty vai disliketty
            find: rows6.length >= 1, // Onko Käyttäjä tehnyt kumpaakaan reseptille
        }

        rows7 = await getRecipeRatingByRecipe(req.params.id, next);
        rows8 = await getRecipemaker(req.params.id, next);
        // Haetaan kuva erikseen, koska sitä välttämättä ei ole, sen takia tarvitaan myös try catch
        try {
            console.log("rows8", rows8[0].Userimg);
            rows9 = await getRecipemakerImage(rows8[0].Userimg, next);

        } catch (e) {
            next(httpError('No Image found', 404));
        }
        if (rows1.length < 1) {
            return next(httpError('No recipe found', 404));
        }

        if (rows2.length < 1) {
            rows2 = '';
        }
        if (rows3.length < 1) {
            rows3 = false;
        }
        if (rows4.length < 1) {
            rows4 = '';
        }
        console.log("rows8", rows8);
        res.json({
            recipes: rows1.pop(), //Ainoastaan yksi matchaava resepti, niin pop
            mealtypes: rows2, //Voi olla monta, niin ei pop
            images: rows3,
            course: rows4.pop(), // Ainoastaan yksi course, niin pop
            favorite: rows5,
            rating: rows6,
            ratingsum: rows7.pop(),
            author: rows8.pop(),
            authorimg: rows9.pop(),
        });

    } catch (e) {
        console.error('recipe_getloggedinuser', e.message);
        next(httpError('Database error', 500));
    }
}
const recipes_mealtypes_get = async (req, res, next) => {

    try {
        const recipesTable = await getRecipeMealTypes(next);
        if (recipesTable.length < 1) {
            next(httpError('No Mealtypes Found', 500));
        }
        res.json(recipesTable);
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
        res.json({recipesTable});
    } catch (e) {
        console.error('filter recipes', e.message);
        next(httpError('Database error', 500));
    }
};
const comment_get = async (req, res, next) => {
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
            const findCommentRatings = await getRecipeCommentRatingsByCommentId(findComments[i].Commentid, next); // Haetaan Kommenttien ideillä niiden arvostelut
            findComments[i] = {
                Commenttext: findComments[i].Commenttext,
                Username: findComments[i].Username,
                Commentrating: findCommentRatings[0].dvalue,
                Commentid: findComments[i].Commentid,
                Userimg: findComments[i].Imagefilepath,

            };
        }
        console.log(findComments);
        res.json(findComments);
    } catch (e) {
        console.error('comment_get', e.message);
        next(httpError('Database error', 500));
    }
};
const comment_getloggedinuser = async (req, res, next) => {
    let rows;
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
            const findCommentRatings = await getRecipeCommentRatingsByCommentId(
                findComments[i].Commentid, next); // Haetaan Kommenttien ideillä niiden arvostelut

            // käyttäjä on kirjautunut, katsotaan onko hän arvostellut ko. kommentin
            const ratingData = [
                req.user.Userid,
                findComments[i].Commentid
            ];
            rows = await getCommentratingByUserid(ratingData, next);
            rows = {
                value: rows,
                find: rows.length >= 1,
            }
            findComments[i] = {
                Commenttext: findComments[i].Commenttext,
                Username: findComments[i].Username,
                Commentrating: findCommentRatings[0].dvalue,
                Commentid: findComments[i].Commentid,
                rating: rows,
                Userimg: findComments[i].Imagefilepath,
            };
        }
        console.log(findComments);
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
            req.user.Userid,
        ];
        const result = await addComment(data, next);
        if (result.affectedRows < 1) {
            next(httpError('Invalid data', 400));
            return;
        }
        res.json({
            message: 'Kommentti lisätty',
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
        const data = [
            req.user.Userid,
            req.params.id,
        ];
        const result = await addFavorite(data, next);
        if (result.affectedRows < 1) {
            next(httpError('Invalid data', 400));
            return;
        }
        res.json({
            message: 'Resepti lisätty suosikkeihin',
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
        const data = [
            req.user.Userid,
            req.params.id,
        ];
        const result = await removeFavorite(data, next);
        if (result.affectedRows < 1) {
            next(httpError('Invalid data', 400));
            return;
        }
        res.json({
            message: 'Resepti poistettu suosikeista',
        });
    } catch (e) {
        console.error('recipe_removefavorite', e.message);
        next(httpError('Internal server error', 500));
    }
};

const recipes_put = async (req, res, next) => {
    try {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors.
            // Error messages can be returned in an array using `errors.array()`.
            console.error('recipes_put validation', errors.array());
            res.json({
                message: 'Täytä vaaditut kentät',
            });
            next(httpError('Invalid data', 400));
            return;
        }
        const thumbnailSizes = [160, 200, 300, 400, 500];
        if (req.file) {
            await thumbnailSizes.forEach(size => {
                sharp(req.file.path).resize({width: size}).png().toFile('./thumbnails/' + req.file.filename + '_' + size + 'px.png');

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
                req.user.Userid,
                req.body.mealtypes,
                req.body.recipeid,
                req.file.filename,
            ];
        } else {
            data = [
                req.body.name,
                req.body.guide,
                req.body.course,
                req.body.time,
                req.body.price,
                req.user.Userid,
                req.body.mealtypes,
                req.body.recipeid,
                false,
            ];
        }
        try {
            const verifyData = [
                data[5],
                data[7],
            ]
            if (req.user.Userrole === 0){
                const result = await modifyRecipesAdmin(data, next);
                if (result.affectedRows < 1) {
                    console.log("asd");
                    next(httpError('Invalid data', 400));
                    return;
                }
                res.json({
                    message: 'Reseptiä muokattu',
                });
            }
            const findIfUserOwnsRecipe = await verifyRecipeOwnership(verifyData, next);
            if (findIfUserOwnsRecipe.length < 1) {
                res.json({
                    message: "Et omista tätä reseptiä",
                })
                next(httpError('Invalid data', 400));
                return;
            }
        } catch (e) {
            return next(httpError('Invalid data', 400));

        }
        const result = await modifyRecipes(data, next);
        if (result.affectedRows < 1) {
            next(httpError('Invalid data', 400));
            return;
        }
        res.json({
            message: 'Reseptiä muokattu',
        });

    } catch (e) {
        console.error('recipes_put', e.message);
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
            console.error('recipes_post validation', errors.array());
            res.json({
                message: 'Täytä vaaditut kentät',
            });
            next(httpError('Invalid data', 400));
            return;
        }
        const thumbnailSizes = [160, 200, 300, 400, 500];
        if (req.file) {

            await thumbnailSizes.forEach(size => {
                sharp(req.file.path).resize({width: size}).png().toFile('./thumbnails/' + req.file.filename + '_' + size + 'px.png');

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
                req.user.Userid,
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
                req.user.Userid,
                req.body.mealtypes,
                "undefined",
            ];
        }
        const result = await addRecipes(data, next);
        if (result.affectedRows < 1) {
            next(httpError('Invalid data', 400));
            return;
        }
        res.json({
            message: 'Resepti lisätty',
        });
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
            req.user.Userid,
            req.params.id,
        ];
        try {
            const removePrevious = await removePreviousReciperating(data, next);

        } catch (e) {

        }
        const result = await addLike(data, next);
        res.json({
            message: 'Tykätty',
        });
        if (result.affectedRows < 1) {
            next(httpError('Invalid data', 400));
        }
    } catch (e) {
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
            req.user.Userid,
            req.params.id,
        ];
        try {
            const removePrevious = await removePreviousReciperating(data, next);
        } catch (e) {

        }
        const result = await addDislike(data, next);
        res.json({
            message: 'Palaute annettu',
        });
        if (result.affectedRows < 1) {
            next(httpError('Invalid data', 400));
        }
    } catch (e) {
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
            req.user.Userid,
            req.params.id,
        ];
        try {
            const removePrevious = await removePreviousCommentrating(data, next);
        } catch (e) {

        }
        const result = await addCommentLike(data, next);
        res.json({
            message: 'Tykätty',
        });
        if (result.affectedRows < 1) {
            next(httpError('Invalid data', 400));
        }
    } catch (e) {
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
            req.user.Userid,
            req.params.id,
        ];
        try {
            const removePrevious = await removePreviousCommentrating(data, next);
        } catch (e) {

        }
        const result = await addCommentDisLike(data, next);
        res.json({
            message: 'Palaute annettu',
        });
        if (result.affectedRows < 1) {
            next(httpError('Invalid data', 400));
        }
    } catch (e) {
        console.error('comment_dislike', e.message);
        next(httpError('Internal server error', 500));
    }
}

const recipe_delete = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors.
            // Error messages can be returned in an array using `errors.array()`.
            console.error('recipe_delete validation', errors.array());
            res.json({
                message: 'Jokin meni pieleen',
            });
            next(httpError('Invalid data', 400));
            return;
        }
        const data = [
            req.user.Userid,
            req.params.id,
        ];
        if (req.user.Userrole === 0) {
            try {
                const result = await deleteRecipeAdmin(data, next);
                if (result.affectedRows < 1) {
                    next(httpError('Invalid data', 400));
                }
                res.json({
                    message: 'Resepti poistettu',
                });
            } catch (e) {
                console.error('recipe_delete', e.message);
                next(httpError('Internal server error', 500));
            }
        }
        const findIfUserOwnsRecipe = await verifyRecipeOwnership(data, next);
        if (findIfUserOwnsRecipe.length < 1) {
            res.json({
                message: "Et omista tätä reseptiä",
            })
            next(httpError('Invalid data', 400));
            return;
        }
        const result = await deleteRecipe(data, next);

        if (result.affectedRows < 1) {
            next(httpError('Invalid data', 400));
        }
        res.json({
            message: 'Resepti poistettu',
        });
    } catch (e) {
        console.error('recipe_delete', e.message);
        next(httpError('Internal server error', 500));
    }
}
const comment_delete = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors.
            // Error messages can be returned in an array using `errors.array()`.
            console.error('comment_delete validation', errors.array());
            res.json({
                message: 'Jokin meni pieleen',
            });
            next(httpError('Invalid data', 400));
            return;
        }

        const data = [
            req.user.Userid,
            req.params.id,

        ];

        if (req.user.Userrole === 0) { // Jos user on admin niin ajetaan suoraan delete
            try {
                const result = await deleteCommentAdmin(data, next);
                if (result.affectedRows < 1) {
                    next(httpError('Invalid data', 400));
                }
                res.json({
                    message: 'Kommentti poistettu',
                });

            } catch (e) {
                console.error('comment_delete', e.message);
                next(httpError('Internal server error', 500));
            }

        }
        const findIfUserOwnsComment = await verifyCommentOwnership(data, next); // jos user ei ole admin, katsotaan omistaako hän kommentin
        if (findIfUserOwnsComment.length < 1) {
            res.json({
                message: "Et omista tätä kommenttia",
            })
            next(httpError('Invalid data', 400));
            return;
        }
        const result = await deleteComment(data, next);

        if (result.affectedRows < 1) {
            next(httpError('Invalid data', 400));
        }
        res.json({
            message: 'Kommentti poistettu',
        });
    } catch (e) {
        console.error('comment_delete', e.message);
        next(httpError('Internal server error', 500));
    }
}
const recipe_removerating = async (req, res, next) => {
    try {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // There are errors.
            // Error messages can be returned in an array using `errors.array()`.
            console.error('recipe_removerating validation', errors.array());
            res.json({
                message: 'Jokin meni pieleen',
            });
            next(httpError('Invalid data', 400));
            return;
        }
        const data = [
            req.user.Userid,
            req.params.id,
        ];
        const result = await removePreviousReciperating(data, next);
        if (result.affectedRows < 1) {
            next(httpError('Invalid data', 400));
        }
        res.json({
            message: 'Arvostelu poistettu',
        });
    } catch (e) {
        console.error('recipe_removerating', e.message);
        next(httpError('Internal server error', 500));
    }
};
const comment_removerating = async (req, res, next) => {
    try {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // There are errors.
            // Error messages can be returned in an array using `errors.array()`.
            console.error('comment_removerating validation', errors.array());
            res.json({
                message: 'Jokin meni pieleen',
            });
            next(httpError('Invalid data', 400));
            return;
        }
        const data = [
            req.user.Userid,
            req.params.id,
        ];

        const result = await removePreviousCommentrating(data, next);
        if (result.affectedRows < 1) {
            next(httpError('Invalid data', 400));
        }
        res.json({
            message: 'Arvostelu poistettu',
        });
    } catch (e) {
        console.error('comment_removerating', e.message);
        next(httpError('Internal server error', 500));
    }
};

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
    get_reguser_owned_recipes,
    recipes_put,
    get_user_owned_recipes,
    recipe_delete,
    comment_delete,
    comment_getloggedinuser,
    recipe_getloggedinuser,
    get_user_favorites,
    get_mostlikedrecipes,
    recipe_removerating,
    comment_removerating,

};


