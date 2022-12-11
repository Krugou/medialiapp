const poolRegUser = require('../database/db');
const {httpError} = require("../utils/errors");
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
    console.error('getRecipeCommentRatingsByCommentId', e.message);
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
    console.error('getRecipeCommentsByUserId', e.message);
    next(httpError('Database error', 500));
  }
};
const getCommentratingByUserid = async (data, next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(
        `SELECT Direction FROM Commentrating WHERE Userid = "${data[0]}" AND Commentid ="${data[1]}";`,data);
    return rows;
  } catch (e) {
    console.error('getCommentratingByUserid', e.message);
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
const addCommentLike = async (data, next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(`INSERT INTO Commentrating (Userid, Commentid, Direction)
                                                     VALUES ("${data[0]}", "${data[1]}", +1);`, // Vaihda 32 pois, kun softa valmis
        data);
    return rows;
  } catch (e) {
    console.error('addCommentLike', e.message);
    next(httpError('Database error', 500));
  }
};
const addCommentDisLike = async (data, next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(`INSERT INTO Commentrating (Userid, Commentid, Direction)
                                                     VALUES ("${data[0]}", "${data[1]}", -1);`, // Vaihda 32 pois, kun softa valmis
        data);
    return rows;
  } catch (e) {
    console.error('addCommentDisLike', e.message);
    next(httpError('Database error', 500));
  }
};
const removePreviousCommentrating = async (data, next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(`DELETE FROM Commentrating WHERE Userid ="${data[0]}" AND Commentid = "${data[1]}";`, // Vaihda 32 pois, kun softa valmis
        data);
    return rows;
  } catch (e) {
    console.error('removePreviousCommentrating', e.message);
    next(httpError('Database error', 500));
  }
};

module.exports = {
  addComment,
  deleteCommentById,
  getRecipeCommentsByRecipe,
  getRecipeCommentsByUserId,
  getRecipeCommentRatingsByCommentId,
  addCommentLike,
  removePreviousCommentrating,
  addCommentDisLike,
  getCommentratingByUserid,

};