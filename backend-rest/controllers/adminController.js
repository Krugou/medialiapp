'use strict';
const { getAllUsersAdmin,
    getUsersCountAdmin,
    getRecipesCount,
    getImagesCount,
    getCommentsCount,
    getCommentRatingCount,
    getReciperatingCount,
    getRecipefavoriteCount,
    getRecipiemealtypeCount,
    modifyuseradmin,
    adduserAdmin,
    deleteuserbyidAdmin,
    getUsersbyidAdmin,
    getRecipesbyUserNameadmin,
    getmealtypesCount,
    getcoursesCount } = require('../models/adminModel');
const { validationResult } = require('express-validator');
const { httpError } = require('../utils/errors');
// admin delete user by id
const delete_user_by_id_admin_delete = async (req, res, next) => {
    try {
        const data = [
            req.params.id,
        ];
        const result = await deleteuserbyidAdmin(data, next);
        if (result.affectedRows < 1) {
            next(httpError('Invalid data', 400));
        }
        res.json({
            message: 'User Deleted',
        });
    }
    catch (e) {
        console.error('delete_user_by_id_admin_delete', e.message);
        next(httpError('Internal server error', 500));
    }
};



// how to add user in controller
const add_user_admin_post = async (req, res, next) => {
    try {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // There are errors.
            // Error messages can be returned in an array using `errors.array()`.
            console.error('add_user_admin_post validation', errors.array());
            next(httpError('Invalid data', 400));
            res.json({
                message: 'Check email and password again',
            });
            return;
        }
        const data = [
            req.body.email,
            req.body.password,
            req.body.role,
        ];
        const result = await adduserAdmin(data, next);
        if (result.affectedRows < 1) {
            next(httpError('Invalid data', 400));
        }
        res.json({
            message: 'User Created',
        });
    }
    catch (e) {
        console.error('add_user_admin_post', e.message);
        next(httpError('Internal server error', 500));
    }
};

const recipes_by_username_admin_get = async (req, res, next) => {
    try {
        const data = [
            req.params.username,
            req.query.page,
            req.query.limit
        ];
        const recipes = await getRecipesbyUserNameadmin(data, next);
        if (recipes.length < 1) {
            next(httpError('No recipes found', 404));
        }
        res.json(recipes);
    } catch (e) {
        console.error('recipes_by_username_admin_get', e.message);
        next(httpError('Database error', 500));
    }
}
const users_by_id_admin_get = async (req, res, next) => {
    try {
        const data = [
            req.params.id,
            req.query.page,
            req.query.limit
        ];
        const users = await getUsersbyidAdmin(data, next);
        if (users.length < 1) {
            next(httpError('No users found', 404));
        }
        res.json(users);
    } catch (e) {
        console.error('users_by_id_admin_get', e.message);
        next(httpError('Database error', 500));
    }
}


const user_list_admin_get = async (req, res, next) => {
    try {
        const users = await getAllUsersAdmin(next);
        if (users.length < 1) {
            next(httpError('No users found', 404));
            return;
        }
        res.json(users);
    } catch (e) {
        console.error('user_list_get', e.message);
        next(httpError('Internal server error', 500));
    }
}
const user_count_admin_get = async (req, res, next) => {
    try {
        const count = await getUsersCountAdmin(next);
        if (count < 1) {
            next(httpError('No counts found', 404));
            return;
        }
        res.json(count);
    } catch (e) {
        console.error('user_count_get', e.message);
        next(httpError('Internal server error', 500));
    }
}
// admindashboard alkaa
const recipe_count_admin_get = async (req, res, next) => {
    try {
        const count = await getRecipesCount(next);
        if (count < 1) {
            next(httpError('No counts found', 404));
            return;
        }
        res.json(count);
    } catch (e) {

        console.error('recipe_count_get', e.message);
        next(httpError('Internal server error', 500));
    }
}
const image_count_admin_get = async (req, res, next) => {
    try {
        const count = await getImagesCount(next);
        if (count < 1) {
            next(httpError('No counts found', 404));
            return;
        }
        res.json(count);
    } catch (e) {
        console.error('image_count_get', e.message);
        next(httpError('Internal server error', 500));
    }
}
const comment_count_admin_get = async (req, res, next) => {
    try {
        const count = await getCommentsCount(next);
        if (count < 1) {
            next(httpError('No counts found', 404));
            return;
        }
        res.json(count);
    } catch (e) {
        console.error('comment_count_get', e.message);
        next(httpError('Internal server error', 500));
    }
}
const commentrating_count_admin_get = async (req, res, next) => {
    try {
        const count = await getCommentRatingCount(next);
        if (count < 1) {
            next(httpError('No counts found', 404));
            return;
        }
        res.json(count);
    } catch (e) {
        console.error('commentrating_count_get', e.message);
        next(httpError('Internal server error', 500));
    }
}
const reciperating_count_admin_get = async (req, res, next) => {
    try {
        const count = await getReciperatingCount(next);
        if (count < 1) {
            next(httpError('No counts found', 404));
            return;
        }
        res.json(count);
    } catch (e) {
        console.error('reciperating_count_get', e.message);
        next(httpError('Internal server error', 500));
    }
}
const recipefavorite_count_admin_get = async (req, res, next) => {
    try {
        const count = await getRecipefavoriteCount(next);
        if (count < 1) {
            next(httpError('No counts found', 404));
            return;
        }
        res.json(count);
    } catch (e) {
        console.error('recipefavorite_count_get', e.message);
        next(httpError('Internal server error', 500));
    }
}
const recipiemealtype_count_admin_get = async (req, res, next) => {
    try {
        const count = await getRecipiemealtypeCount(next);
        if (count < 1) {
            next(httpError('No counts found', 404));
            return;
        }
        res.json(count);
    } catch (e) {
        console.error('recipiemealtype_count_get', e.message);
        next(httpError('Internal server error', 500));
    }
}
const mealtypes_count_admin_get = async (req, res, next) => {
    try {
        const count = await getmealtypesCount(next);
        if (count < 1) {
            next(httpError('No counts found', 404));
            return;
        }
        res.json(count);
    } catch (e) {
        console.error('mealtypes_count_get', e.message);
        next(httpError('Internal server error', 500));
    }
}
const courses_count_admin_get = async (req, res, next) => {
    try {
        const count = await getcoursesCount(next);
        if (count < 1) {
            next(httpError('No counts found', 404));
            return;
        }
        res.json(count);
    } catch (e) {
        console.error('courses_count_get', e.message);
        next(httpError('Internal server error', 500));
    }
}
// admindashboard loppuu
const user_modify_admin_put = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            next(httpError('Invalid input', 400));
            return;
        }
        const user = await modifyuseradmin(req.body, next);
        if (!user) {
            next(httpError('User not found', 404));
            return;
        }
        res.json(user);
    } catch (e) {
        console.error('user_modify_put', e.message);
        next(httpError('Internal server error', 500));
    }
}
const user_delete_admin_delete = async (req, res, next) => {
    try {
        const user = await deleteUserAdmin(req.params.id, next);
        if (!user) {
            next(httpError('User not found', 404));
            return;
        }
        res.json(user);
    } catch (e) {
        console.error('user_delete_delete', e.message);
        next(httpError('Internal server error', 500));
    }
}
const user_get_admin_get = async (req, res, next) => {
    try {
        const user = await getUserAdmin(req.params.id, next);
        if (!user) {
            next(httpError('User not found', 404));
            return;
        }
        res.json(user);
    } catch (e) {
        console.error('user_get_get', e.message);
        next(httpError('Internal server error', 500));
    }
}
const user_get_all_admin_get = async (req, res, next) => {
    try {
        const users = await getUsersAdmin(next);
        if (!users) {
            next(httpError('Users not found', 404));
            return;
        }
        res.json(users);
    } catch (e) {
        console.error('user_get_all_get', e.message);
        next(httpError('Internal server error', 500));
    }
}
const recipe_modify_admin_put = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            next(httpError('Invalid input', 400));
            return;
        }
        const recipe = await modifyrecipeadmin(req.body, next);
        if (!recipe) {
            next(httpError('Recipe not found', 404));
            return;
        }
        res.json(recipe);
    } catch (e) {
        console.error('recipe_modify_put', e.message);
        next(httpError('Internal server error', 500));
    }
}
const recipe_delete_admin_delete = async (req, res, next) => {
    try {
        const recipe = await deleteRecipeAdmin(req.params.id, next);
        if (!recipe) {
            next(httpError('Recipe not found', 404));
            return;
        }
        res.json(recipe);
    } catch (e) {
        console.error('recipe_delete_delete', e.message);
        next(httpError('Internal server error', 500));
    }
}
const recipe_get_admin_get = async (req, res, next) => {
    try {
        const recipe = await getRecipeAdmin(req.params.id, next);
        if (!recipe) {
            next(httpError('Recipe not found', 404));
            return;
        }
        res.json(recipe);
    } catch (e) {
        console.error('recipe_get_get', e.message);
        next(httpError('Internal server error', 500));
    }
}
const recipe_get_all_admin_get = async (req, res, next) => {
    try {
        const recipes = await getRecipesAdmin(next);
        if (!recipes) {
            next(httpError('Recipes not found', 404));
            return;
        }
        res.json(recipes);
    } catch (e) {
        console.error('recipe_get_all_get', e.message);
        next(httpError('Internal server error', 500));
    }
}
const recipefavorite_modify_admin_put = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            next(httpError('Invalid input', 400));
            return;
        }
        const recipefavorite = await modifyrecipefavoriteadmin(req.body, next);
        if (!recipefavorite) {
            next(httpError('Recipefavorite not found', 404));
            return;
        }
        res.json(recipefavorite);
    } catch (e) {
        console.error('recipefavorite_modify_put', e.message);
        next(httpError('Internal server error', 500));
    }
}
const recipefavorite_delete_admin_delete = async (req, res, next) => {
    try {
        const recipefavorite = await deleteRecipefavoriteAdmin(req.params.id, next);
        if (!recipefavorite) {
            next(httpError('Recipefavorite not found', 404));
            return;
        }
        res.json(recipefavorite);
    } catch (e) {
        console.error('recipefavorite_delete_delete', e.message);
        next(httpError('Internal server error', 500));
    }
}
const recipefavorite_get_admin_get = async (req, res, next) => {
    try {
        const recipefavorite = await getRecipefavoriteAdmin(req.params.id, next);
        if (!recipefavorite) {
            next(httpError('Recipefavorite not found', 404));
            return;
        }
        res.json(recipefavorite);
    } catch (e) {
        console.error('recipefavorite_get_get', e.message);
        next(httpError('Internal server error', 500));
    }
}
const recipefavorite_get_all_admin_get = async (req, res, next) => {
    try {
        const recipefavorites = await getRecipefavoritesAdmin(next);
        if (!recipefavorites) {
            next(httpError('Recipefavorites not found', 404));
            return;
        }
        res.json(recipefavorites);
    } catch (e) {
        console.error('recipefavorite_get_all_get', e.message);
        next(httpError('Internal server error', 500));
    }
}
const recipecomment_modify_admin_put = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            next(httpError('Invalid input', 400));
            return;
        }
        const recipecomment = await modifyrecipecommentadmin(req.body, next);
        if (!recipecomment) {
            next(httpError('Recipecomment not found', 404));
            return;
        }
        res.json(recipecomment);
    } catch (e) {
        console.error('recipecomment_modify_put', e.message);
        next(httpError('Internal server error', 500));
    }
}
const recipecomment_delete_admin_delete = async (req, res, next) => {
    try {
        const recipecomment = await deleteRecipecommentAdmin(req.params.id, next);
        if (!recipecomment) {
            next(httpError('Recipecomment not found', 404));
            return;
        }
        res.json(recipecomment);
    } catch (e) {
        console.error('recipecomment_delete_delete', e.message);
        next(httpError('Internal server error', 500));
    }
}
const recipecomment_get_admin_get = async (req, res, next) => {
    try {
        const recipecomment = await getRecipecommentAdmin(req.params.id, next);
        if (!recipecomment) {
            next(httpError('Recipecomment not found', 404));
            return;
        }
        res.json(recipecomment);
    } catch (e) {
        console.error('recipecomment_get_get', e.message);
        next(httpError('Internal server error', 500));
    }
}
const recipecomment_get_all_admin_get = async (req, res, next) => {
    try {
        const recipecomments = await getRecipecommentsAdmin(next);
        if (!recipecomments) {
            next(httpError('Recipecomments not found', 404));
            return;
        }
        res.json(recipecomments);
    } catch (e) {
        console.error('recipecomment_get_all_get', e.message);
        next(httpError('Internal server error', 500));
    }
}

module.exports = {
    user_modify_admin_put,
    user_delete_admin_delete,
    user_get_admin_get,
    user_get_all_admin_get,
    recipe_modify_admin_put,
    recipe_delete_admin_delete,
    recipe_get_admin_get,
    recipe_get_all_admin_get,
    recipefavorite_modify_admin_put,
    recipefavorite_delete_admin_delete,
    recipefavorite_get_admin_get,
    recipefavorite_get_all_admin_get,
    recipecomment_modify_admin_put,
    recipecomment_delete_admin_delete,
    recipecomment_get_admin_get,
    recipecomment_get_all_admin_get,
    add_user_admin_post,
    recipes_by_username_admin_get,
    users_by_id_admin_get,
    user_list_admin_get,
    user_count_admin_get,
    recipe_count_admin_get,
    image_count_admin_get,
    comment_count_admin_get,
    commentrating_count_admin_get,
    reciperating_count_admin_get,
    recipefavorite_count_admin_get,
    recipiemealtype_count_admin_get,
    mealtypes_count_admin_get,
    courses_count_admin_get


}




