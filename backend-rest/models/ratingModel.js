const poolRegUser = require('../database/db');
const promisePoolRegUser = poolRegUser.promise();

const addCommentRating = async (data, next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(`INSERT INTO CommentRating (Direction, Userid, Commentid)
                                                    VALUES (?, ?, ?);`,
        data);
    return rows;
  } catch (e) {
    console.error('addCommentRating', e.message);
    next(httpError('Database error', 500));
  }
};
const deleteCommentRatingById = async (params, next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(
        `DELETE FROM CommentRating WHERE Commentid = "${params}";
                        `);
    return rows;
  } catch (e) {
    console.error('deleteCommentRatingById', e.message,
    );
    next(httpError('Database error', 500));
  }
};
// miten nää lasketaan tulokseksi?
const getCommentRatingByRecipe = async (params, next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(
        `SELECT SUM(Direction) FROM CommentRating  WHERE Commentid = "${params}";
                        `);
    return rows;
  } catch (e) {
    console.error('getRecipeRating', e.message);
    next(httpError('Database error', 500));
  }
};

// miten nää lasketaan tulokseksi?
const getRecipeRatingByRecipe = async (params, next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(
        `SELECT stars FROM RecipeRating  WHERE Recipeid = "${params}";
                        `);
    return rows;
  } catch (e) {
    console.error('getRecipeRating', e.message);
    next(httpError('Database error', 500));
  }
};

addRecipeRating = async (data, next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(`INSERT INTO RecipeRating (Stars, Userid, Recipeid)
                                                    VALUES (?, ?, ?);`,
        data);
    return rows;
  } catch (e) {
    console.error('addRecipeRating', e.message);
    next(httpError('Database error', 500));
  }
};
const deleteRecipeRatingById = async (params, next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(
        `DELETE FROM RecipeRating WHERE Recipeid = "${params}";
                        `);
    return rows;
  } catch (e) {
    console.error('deleteRecipeRatingById', e.message,
    );
    next(httpError('Database error', 500));
  }
};
module.exports = {
  addCommentRating,
  deleteCommentRatingById,
  getCommentRatingByRecipe,
  getRecipeRatingByRecipe,
  addRecipeRating,
  deleteRecipeRatingById,
};
