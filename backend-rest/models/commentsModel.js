const poolRegUser = require('../database/db');
const promisePoolRegUser = poolRegUser.promise();

const getRecipeCommentsByRecipe = async (params, next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(
        `SELECT Commentid, Commenttext, Users.Username FROM Comments
                 INNER JOIN Users ON Comments.Commentuserid = Users.Userid WHERE CommentRecipe = "${params}";
                        `);
    return rows;
  } catch (e) {
    console.error('getRecipeCommentsByRecipeid', e.message);
    next(httpError('Database error', 500));
  }
};
const getRecipeCommentRatingsByCommentId = async (params, next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(`SELECT SUM(Direction) AS dvalue FROM Commentrating
                                                                   WHERE Commentid = ${params};`);
    return rows;
  } catch (e) {
    console.error('getRecipeComments', e.message);
    next(httpError('Database error', 500));
  }
};
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
};

const addComment = async (data, next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(`INSERT INTO Comments (Commenttext, Commentrecipe, Commentuserid) 
                                                    VALUES (?, ?, 32);`, // Vaihda 32 pois, kun softa valmis
        data);
    return rows;
  } catch (e) {
    console.error('addComment', e.message);
    next(httpError('Database error', 500));
  }
};
const deleteCommentById = async (params, next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(
        `DELETE FROM Comments WHERE CommentId = "${params}";
                        `);
    return rows;
  } catch (e) {
    console.error('deleteCommentById', e.message,
    );
    next(httpError('Database error', 500));
  }
};

module.exports = {
  addComment,
  deleteCommentById,
  getRecipeCommentsByRecipe,
  getRecipeCommentsByUserId,
  getRecipeCommentRatingsByCommentId,

};