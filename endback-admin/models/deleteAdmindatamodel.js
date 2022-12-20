'use strict';

const pooladmin = require('../database/db');
const promisePoolAdmin = pooladmin.promise();

const deleteusers = async (userid) => {
    try {// console log oppenheimer quote
        console.log('i have become death, destroyer of worlds');

        // 1. Delete the user from the Users table
        const [rows] = await promisePoolAdmin.execute(
            'DELETE FROM `jakrecipes`.`Users` WHERE Userid = ?;', [userid]);
        return rows;
    } catch (e) {
        console.error('error deleteusers', e.message);
    }
}

const deletecomments = async (commentid) => {
    try { // console log oppenheimer quote
        console.log('i have become death, destroyer of worlds');

        const promisePoolAdmin = pool.promise(); // Create a promise pool for the administrator.
        const [rows] = await promisePoolAdmin.execute( // Execute a query on the promise pool.
            'DELETE FROM `jakrecipes`.`Comments` WHERE Commentid = ?;', [commentid]); // Delete the comment.
        return rows; // Return the rows.
    } catch (e) {
        console.error('error deletecomments', e.message);
    }
}

const deleterecipes = async (data) => {

    // console log oppenheimer quote
    console.log('i have become death, destroyer of worlds');
    let rows, rows2, rows3;
    try {
        try {
            [rows] = await promisePoolAdmin.execute(`DELETE
                                                       FROM Images
                                                       WHERE Imagerecipe = ${data};`,
                data);
        }
        catch (e) {

        }
        try {
            [rows2] = await promisePoolAdmin.execute(`DELETE
                                                        FROM Recipemealtype
                                                        WHERE Recipeid = ${data};`,
                data);
        }
        catch (e) {

        }
        try {
            [rows3] = await promisePoolAdmin.execute(`DELETE
                                                  FROM Recipefavorite
                                                  WHERE Recipeid = ${data};`,
                data);
        }
        catch (e) {

        }
        try {
            let [rows4] = await promisePoolAdmin.execute(`DELETE
                                                  FROM Reciperating
                                                  WHERE Recipeid = ${data};`,
                data);
        }
        catch (e) {

        }
        try {
            let [rows5] = await promisePoolAdmin.execute(`DELETE
                                                  FROM Commentrating
                                                  WHERE  Commentrating.Commentid IN (
                                                    SELECT Comments.Commentid FROM Comments
                                                    WHERE Commentrecipe = ${data}); ;`,
                data);
        }
        catch (e) {

        }
        try {
            let [rows6] = await promisePoolAdmin.execute(`DELETE
                                                  FROM Comments
                                                  WHERE Commentrecipe = ${data};`,
                data);
        }
        catch (e) {

        }
        try {
            let [rows7] = await promisePoolAdmin.execute(`DELETE
                                                        FROM Recipes
                                                        WHERE Recipeid = ${data};`,
                data);
        }
        catch (e) {

        }
        return rows;
    } catch (e) {
        console.error('deleteRecipeAdmin', e.message);
        next(httpError('Database error', 500));
    }
};

module.exports = {
    deletecomments
    , deleterecipes
    , deleteusers
}
