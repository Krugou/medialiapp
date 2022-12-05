const poolRegUser = require('../database/db');
const promisePoolRegUser = poolRegUser.promise();

const getRecipeCommentsByRecipe = async (params, next) => {
    try {
        const [rows] = await promisePoolRegUser.execute(
            `SELECT CommentText FROM Comments  WHERE CommentRecipe = "${params}";
                        `);
        return rows;
    } catch (e) {
        console.error('getRecipeComments', e.message);
        next(httpError('Database error', 500));
    }
}
const getRecipeCommentsByUserId = async (params, next) => {
    try {
        const [rows] = await promisePoolRegUser.execute(
            `SELECT CommentText FROM Comments  WHERE Commentuserid = "${params}";
                        `);
        return rows;
    } catch (e) {
        console.error('getRecipeComments', e.message);
        next(httpError('Database error', 500));
    }
}

const addComment = async (data, next) => {
    try {
        const [rows] = await promisePoolRegUser.execute(`INSERT INTO Comments (CommentText, Commentrecipe, Commentuserid) 
                                                    VALUES (?, ?, ?);`,
                                                        data);
        return rows;
    } catch (e) {
        console.error('addComment', e.message);
        next(httpError('Database error', 500));
    }
}
const deleteCommentById = async (params, next) => {
    try {
        const [rows] = await promisePoolRegUser.execute(`DELETE FROM Comments WHERE CommentId = "${params}";
                        `);
        return rows;
    } catch (e) {
        console.error('deleteCommentById', e.message
        );
        next(httpError('Database error', 500));
    }
}



        
module.exports = {
    addComment,
    deleteCommentById,
    getRecipeCommentsByRecipe,
    getRecipeCommentsByUserId,

};