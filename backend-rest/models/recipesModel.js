'use strict';
const poolRegUser = require('../database/db');
const poolUser = require('../database/db');
const pooladmin = require('../database/db');
const {httpError} = require('../utils/errors');
const promisePoolAdmin = pooladmin.promise();
const promisePoolRegUser = poolRegUser.promise();
const promisePoolUser = poolUser.promise();

const getRecipeById = async (Recipeid, next) => {
  try {
    const [rows] = await promisePoolUser.execute(
        `SELECT * FROM Recipes WHERE Recipeid = ${Recipeid}`);
    return rows;
  } catch (e) {
    console.error('getRecipe', e.message);
    next(httpError('Database error', 500));
  }
};
const getMealtypeByRecipeId = async (Recipeid, next) => {
  try {
    const [rows] = await promisePoolUser.execute(`SELECT DISTINCT Mealtypes.Mealtype
                                                      FROM Recipes INNER JOIN Recipemealtype ON Recipes.Recipeid = Recipemealtype.Recipeid
                                                                   INNER JOIN Mealtypes ON Mealtypes.Mealid = Recipemealtype.Mealid
                                                      WHERE Recipes.Recipeid = ${Recipeid};`);
    return rows;
  } catch (e) {
    console.error('getMealtypeByRecipeId', e.message);
    next(httpError('Database error', 500));
  }
};
const getImageByRecipeId = async (Recipeid, next) => {
  try {
    const [rows] = await promisePoolUser.execute(`SELECT Images.Imagefilepath FROM Images
                                                      WHERE Images.Imagerecipe = ${Recipeid};`);
    return rows;
  } catch (e) {
    console.error('getImageByRecipeId', e.message);
    next(httpError('Database error', 500));
  }
};
/*
const getRecipeLikesByRecipeId = async (Recipeid, next) => {
    try {
        const [rows] = await promisePoolUser.execute(`SELECT * FROM Recipes WHERE Recipeid = ${Recipeid}`);
        return rows;
    } catch (e) {
        console.error('getRecipe', e.message);
        next(httpError('Database error', 500));
    }
};
*/
const getCoursetypeByCourseId = async (recipecourse, next) => {
  try {
    const [rows] = await promisePoolUser.execute(`SELECT Courses.Coursetype FROM Courses
                                                        where Courses.Courseid = ${recipecourse}`);

    return rows;

  } catch (e) {
    console.error(' getCoursetypeByRecipeId ', e.message);
    next(httpError('Database error', 500));
  }
};
const getRecipemaker = async (Recipeid, next) => {
  try {
    const [rows] = await promisePoolUser.execute(`SELECT Users.Username, Users.Userimg  FROM Users
                                                     INNER JOIN Recipes ON
                                                    Recipes.Recipemaker = Users.Userid
                                                     WHERE Recipeid = ${Recipeid}`);
    return rows;
  } catch (e) {
    console.error('getRecipe', e.message);
    next(httpError('Database error', 500));
  }
};const getRecipemakerImage = async (Imageid, next) => {
  try {
    const [rows] = await promisePoolUser.execute(`SELECT Imagefilepath  FROM Images
                                                      WHERE Imageid = ${Imageid}`);
    return rows;
  } catch (e) {
    console.error('getRecipe', e.message);
    next(httpError('Database error', 500));
  }
};
/*
const getRecipe = async (Recipeid, next) => {
    try {
        const [rows] = await promisePoolUser.execute(`SELECT Recipes.Recipeid,Recipes.Recipename,Recipes.Recipetime, Recipes.Recipeguide, Recipes.Recipemaker, Reciperating.Stars, Images.Imagefilepath, Mealtypes.Mealtype,Courses.Coursetype, Comments.Commenttext, Commentrating.Direction
FROM Recipes
INNER JOIN Images ON Recipes.Recipeid = Images.Imagerecipe
INNER JOIN Recipemealtype ON Recipes.Recipeid = Recipemealtype.Recipeid
INNER JOIN Mealtypes
INNER JOIN Courses ON Recipes.Recipecourse = Courses.Courseid
INNER JOIN Comments ON Recipes.Recipeid = Comments.Commentrecipe
INNER JOIN Commentrating ON Commentrating.Commentid = Comments.Commentid
INNER JOIN Reciperating ON Reciperating.Recipeid = Recipes.Recipeid
WHERE Recipes.Recipeid = ${Recipeid};`);
        return rows;
    } catch (e) {
        console.error('getRecipe', e.message);
        next(httpError('Database error', 500));
    }
};
*/

// tämän yläpuolelle valmiit funktiot

// admin komento
const getAllRecipes = async (next) => {
  try {
    const [rows] = await promisePoolAdmin.execute(`SELECT *
FROM Recipes 
 INNER JOIN  Users  on Recipes.Recipemaker = Users.Userid 
 INNER JOIN Recipemealtype ON Recipes.Recipeid = Recipemealtype.Recipeid 
  INNER JOIN Mealtypes 
  INNER JOIN Courses ON Recipes.Recipecourse = Courses.Courseid   INNER JOIN Images ON  Recipes.Recipeid = Images.ImageRecipe `);
    return rows;
  } catch (e) {
    console.error('getAllRecipes', e.message);
    next(httpError('Database error', 500));
  }
};

const getRecipesCount = async (next) => {
  try {
    const [rows] = await promisePoolAdmin.execute(
        'SELECT COUNT(*) AS count FROM Recipes');
    console.log('count ', rows[0].count);
    return rows[0].count;
  } catch (e) {
    console.error('getRecipesCount', e.message);
    next(httpError('Database error', 500));
  }
};
const getRecipeMealTypes = async (next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(
        `SELECT * FROM Mealtypes;
                        `);
    return rows;
  } catch (e) {
    console.error('getMealTypes', e.message);
    next(httpError('Database error', 500));
  }
};
const getFavorite = async (data, next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(`SELECT * FROM Recipefavorite
                                                                WHERE Userid = ? AND Recipeid = ?;`,
        data);
    return rows;
  } catch (e) {
    console.error('getFavorite', e.message);
    next(httpError('Database error', 500));
  }
};
const getReciperatingByUser = async (data, next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(`SELECT Stars FROM Reciperating
                                                                WHERE Userid = ? AND Recipeid = ?;`,
        data);
    return rows;
  } catch (e) {
    console.error('getFavorite', e.message);
    next(httpError('Database error', 500));
  }
};

const findRecipesByName = async (name, next) => {

  try {
    const [rows] = await promisePoolRegUser.execute(`SELECT Recipes.Recipeid,Recipes.Recipename , Recipes.Recipetime, Recipes.Recipeguide, Recipes.Recipemaker, Courses.Coursetype, Mealtypes.Mealtype, Images.Imagefilepath
FROM Recipes INNER JOIN Recipemealtype ON Recipes.Recipeid = Recipemealtype.Recipeid 
  INNER JOIN Mealtypes  INNER JOIN Courses ON Recipes.Recipecourse = Courses.Courseid   INNER JOIN Images ON  Recipes.Recipeid = Images.ImageRecipe RecipeName = "${name}";GROUP BY Recipeid
                                                `);
    return rows;
  } catch (e) {
    console.error('findRecipesByName', e.message);
    next(httpError('Database error', 500));
  }
};
const findRecipesByCourseCategory = async (name, next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(`SELECT Recipes.Recipeid,Recipes.Recipename , Recipes.Recipetime, Recipes.Recipeguide, Recipes.Recipemaker, Courses.Coursetype, Mealtypes.Mealtype, Images.Imagefilepath
FROM Recipes INNER JOIN Recipemealtype ON Recipes.Recipeid = Recipemealtype.Recipeid 
  INNER JOIN Mealtypes  INNER JOIN Courses ON Recipes.Recipecourse = Courses.Courseid   INNER JOIN Images ON  Recipes.Recipeid = Images.ImageRecipe WHERE Courses.Coursetype = "${name}";GROUP BY Recipeid
                                                `);
    return rows;
  } catch (e) {
    console.error('findRecipesByCourseCategory', e.message);
    next(httpError('Database error', 500));
  }
};
const findRecipesByMealType = async (name, next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(`SELECT Recipes.Recipeid,Recipes.Recipename , Recipes.Recipetime, Recipes.Recipeguide, Recipes.Recipemaker, Courses.Coursetype, Mealtypes.Mealtype, Images.Imagefilepath
FROM Recipes INNER JOIN Recipemealtype ON Recipes.Recipeid = Recipemealtype.Recipeid 
  INNER JOIN Mealtypes  INNER JOIN Courses ON Recipes.Recipecourse = Courses.Courseid   INNER JOIN Images ON  Recipes.Recipeid = Images.ImageRecipe  WHERE Mealtypes.Mealtype = "${name}"; = 'test' GROUP BY Recipeid
                                                `);
    return rows;
  } catch (e) {
    console.error('findRecipesByMealType', e.message);
    next(httpError('Database error', 500));
  }
};

const findRecipesByAuthorId = async (name, next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(`SELECT Recipes.Recipeid,Recipes.Recipename , Recipes.Recipetime, Recipes.Recipeguide, Recipes.Recipemaker, Courses.Coursetype, Mealtypes.Mealtype, Images.Imagefilepath
FROM Recipes INNER JOIN Recipemealtype ON Recipes.Recipeid = Recipemealtype.Recipeid 
  INNER JOIN Mealtypes  INNER JOIN Courses ON Recipes.Recipecourse = Courses.Courseid   INNER JOIN Images ON  Recipes.Recipeid = Images.ImageRecipe    WHERE Users.Userid = "${name};GROUP BY Recipeid
                                                `);
    return rows;
  } catch (e) {
    console.error('findRecipesByAuthor', e.message);
    next(httpError('Database error', 500));
  }
};
const findRecipesById = async (id, next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(`SELECT Recipes.Recipeid,Recipes.Recipename , Recipes.Recipetime, Recipes.Recipeguide, Recipes.Recipemaker, Courses.Coursetype, Mealtypes.Mealtype, Images.Imagefilepath
FROM Recipes INNER JOIN Recipemealtype ON Recipes.Recipeid = Recipemealtype.Recipeid 
  INNER JOIN Mealtypes  INNER JOIN Courses ON Recipes.Recipecourse = Courses.Courseid   INNER JOIN Images ON  Recipes.Recipeid = Images.ImageRecipe   WHERE Recipes.Recipeid = "${name};GROUP BY Recipeid
                                                `);
    return rows;
  } catch (e) {
    console.error('findRecipesById', e.message);
    next(httpError('Database error', 500));
  }
};
const updateRecipes = async (data, next) => {
  console.log('updateRecipes');
  try {
    const [rows] = await promisePoolRegUser.execute(
        `UPDATE Recipes SET RecipeName = ?, RecipeDescription = ?, RecipeImage = ?, RecipeIngredients = ?, RecipeInstructions = ?, RecipeCategory = ?, RecipeAuthor = ? WHERE RecipeId = ?;`,
        data);
    return rows;
  } catch (e) {
    console.error('updateRecipes', e.message);
    next(httpError('Database error', 500));
  }
};
const deleteRecipesById = async (id, next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(
        `DELETE FROM Recipes,Users,RecipeMealtype,mealtypes,Images AND Recipes.Recipeid = Images.ImageRecipe  AND Recipes.Recipeid = Recipemealtype.Mealid AND Recipes.Recipemaker = Users.Userid AND Recipemealtype.Mealid = Mealtypes.Mealtype WHERE RecipeId = ?;`,
        id);
    return rows;
  } catch (e) {
    console.error('deleteRecipesById', e.message);
    next(httpError('Database error', 500));
  }
};
const deleteRecipeByAuthorId = async (id, next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(
        `DELETE FROM Recipes,RecipeMealtype,mealtypes,Images AND Recipes.Recipeid = Images.ImageRecipe  AND Recipes.Recipeid = Recipemealtype.Mealid AND Recipes.Recipemaker = Users.Userid AND Recipemealtype.Mealid = Mealtypes.Mealtype WHERE UserId = ?;`,
        id);
    return rows;
  } catch (e) {
    console.error('deleteRecipeByAuthorId', e.message);
    next(httpError('Database error', 500));
  }
};

const addRecipes = async (data, next) => {
  let rows2;
  let rows3;
  try {
    const [rows] = await promisePoolRegUser.execute(` 
                                                        INSERT INTO Recipes (Recipename, Recipeguide, Recipecourse, Recipetime, Recipeprice, Recipemaker)
                                                         VALUES ("${data[0]}", "${data[1]}", "${data[2]}", "${data[3]}", "${data[4]}", "${data[5]}");
                                                        `, data);
    const tempArray = data[6].split(',');
    try {
      for (let i = 0; i < tempArray.length; i++) {
        [rows2] = await promisePoolRegUser.execute(`INSERT INTO Recipemealtype (Recipeid, Mealid)
                                                            VALUES (LAST_INSERT_ID(), ${tempArray[i]});`);
      }
    } catch (e) {

    }
    try {
      [rows3] = await promisePoolRegUser.execute(`INSERT INTO Images (Images.Imagerecipe, Images.Imagefilepath)
                                                              VALUES (LAST_INSERT_ID(), '${data[7]}');
            `, data);

    } catch (e) {

    }
    return rows, rows2, rows3;
  } catch (e) {
    console.error('addRecipes input', e.message);
    next(httpError('Database error', 500));
  }
};
const modifyRecipes = async (data, next) => {
  let rows2;
  let rows3;
  try {
    const [rows] = await promisePoolRegUser.execute(`
                                                        UPDATE Recipes SET Recipename = "${data[0]}", Recipeguide = "${data[1]}", Recipecourse = "${data[2]}", Recipetime = "${data[3]}", Recipeprice = "${data[4]}"
                                                 WHERE Recipeid = ${data[7]} AND Recipemaker = ${data[5]}; 
                                                       `, data);
    const tempArray = data[6].split(',');
    try {
      const deletePreviousMealtypes = promisePoolRegUser.execute(`DELETE FROM Recipemealtype WHERE Recipeid = ${data[7]};`, data);
      for (let i = 0; i < tempArray.length; i++) {
        [rows2] = await promisePoolRegUser.execute(`INSERT INTO Recipemealtype (Recipeid, Mealid)
                                                    VALUES (${data[7]}, ${tempArray[i]});`, data);
      }
    } catch (e) {

    }
    console.log('data8',data[8]);
    if (data[8]) {       // Jos on uusi kuva, niin päivitetään se, muuten ei päivitetä, jotta ei tulisi luotua placeholder kuvaa
      try {
        console.log("asdasdasdads");
        [rows3] = await promisePoolRegUser.execute(`UPDATE Images
                                                    SET Images.Imagefilepath = "${data[8]}"
                                                    WHERE Images.Imagerecipe = "${data[7]}";
        `, data);

      } catch (e) {

      }
    } else {
      rows3="";
    }
    return rows, rows2, rows3;
  } catch (e) {
    console.error('modifyRecipes input', e.message);
    next(httpError('Database error', 500));
  }
};
const modifyRecipesAdmin = async (data, next) => {
  let rows2;
  let rows3;
  try {
    const [rows] = await promisePoolRegUser.execute(`
                                                        UPDATE Recipes SET Recipename = "${data[0]}", Recipeguide = "${data[1]}", Recipecourse = "${data[2]}", Recipetime = "${data[3]}", Recipeprice = "${data[4]}"
                                                 WHERE Recipeid = ${data[7]}; 
                                                       `, data);
    const tempArray = data[6].split(',');
    try {
      const deletePreviousMealtypes = promisePoolRegUser.execute(`DELETE FROM Recipemealtype WHERE Recipeid = ${data[7]};`, data);
      for (let i = 0; i < tempArray.length; i++) {
        [rows2] = await promisePoolRegUser.execute(`INSERT INTO Recipemealtype (Recipeid, Mealid)
                                                    VALUES (${data[7]}, ${tempArray[i]});`, data);
      }
    } catch (e) {

    }
    console.log('data8',data[8]);
    if (data[8]) {       // Jos on uusi kuva, niin päivitetään se, muuten ei päivitetä, jotta ei tulisi luotua placeholder kuvaa
      try {
        [rows3] = await promisePoolRegUser.execute(`UPDATE Images
                                                    SET Images.Imagefilepath = "${data[8]}"
                                                    WHERE Images.Imagerecipe = "${data[7]}";
        `, data);

      } catch (e) {

      }
    } else {
      rows3="";
    }
    return rows, rows2, rows3;
  } catch (e) {
    console.error('modifyRecipesAdmin input', e.message);
    next(httpError('Database error', 500));
  }
};

const verifyRecipeOwnership = async (data, next) => {
  try {
    const [rows] = await promisePoolUser.execute(`SELECT * FROM Recipes
                                                      WHERE Recipeid = ${data[1]} AND Recipemaker = ${data[0]};`);
    return rows;
  }
  catch (e) {
    console.error('verifyRecipeOwnership', e.message);
    next(httpError('Database error', 500));
  }

}
const addFavorite = async (data, next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(`INSERT INTO Recipefavorite (Userid, Recipeid)
                                                                VALUES (?,?);`,
        data);
    return rows;
  } catch (e) {
    console.error('addFavorite', e.message);
    next(httpError('Database error', 500));
  }
};
const removeFavorite = async (data, next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(`DELETE FROM Recipefavorite
                                                        WHERE Userid = ? AND Recipeid = ?;`,
        data);
    return rows;
  } catch (e) {
    console.error('removeFavorite', e.message);
    next(httpError('Database error', 500));
  }
};
const addLike = async (data, next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(`INSERT INTO Reciperating (Userid, Recipeid, Stars)
                                                     VALUES ("${data[0]}", "${data[1]}", +1);`, // Vaihda 32 pois, kun softa valmis
        data);
    return rows;
  } catch (e) {
    console.error('addLike', e.message);
    next(httpError('Database error', 500));
  }
};
const addDislike = async (data, next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(`INSERT INTO Reciperating (Userid, Recipeid, Stars)
                                                     VALUES ("${data[0]}", "${data[1]}", -1);`, // Vaihda 32 pois, kun softa valmis
        data);
    return rows;
  } catch (e) {
    console.error('addDislike', e.message);
    next(httpError('Database error', 500));
  }
};
const removePreviousReciperating = async (data, next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(`DELETE FROM Reciperating WHERE Userid ="${data[0]}" AND Recipeid = "${data[1]}";`,
        data);
    return rows;
  } catch (e) {
    console.error('removePreviousRating', e.message);
    next(httpError('Database error', 500));
  }
};
const deleteRecipe = async (data, next) => {
  let rows, rows2, rows3;
  try {
    try {
       [rows] = await promisePoolRegUser.execute(`DELETE
                                                       FROM Images
                                                       WHERE Imagerecipe = ${data[1]};`,
          data);
    }
    catch (e) {

    }
    try {
       [rows2] = await promisePoolRegUser.execute(`DELETE
                                                        FROM Recipemealtype
                                                        WHERE Recipeid = ${data[1]};`,
          data);
    }
    catch (e) {

    }
    try {
      [rows3] = await promisePoolRegUser.execute(`DELETE
                                                  FROM Recipefavorite
                                                  WHERE Recipeid = ${data[1]};`,
          data);
    }
    catch (e) {

    }
    try {
     let [rows4] = await promisePoolRegUser.execute(`DELETE
                                                  FROM Reciperating
                                                  WHERE Recipeid = ${data[1]};`,
          data);
    }
    catch (e) {

    }
    try {
     let  [rows5] = await promisePoolRegUser.execute(`DELETE
                                                  FROM Commentrating
                                                  WHERE  Commentrating.Commentid IN (
                                                    SELECT Comments.Commentid FROM Comments
                                                    WHERE Commentrecipe = ${data[1]}); ;`,
          data);
    }
    catch (e) {

    }
    try {
     let [rows6] = await promisePoolRegUser.execute(`DELETE
                                                  FROM Comments
                                                  WHERE Commentrecipe = ${data[1]};`,
          data);
    }
    catch (e) {

    }
    try {
      let [rows7] = await promisePoolRegUser.execute(`DELETE
                                                        FROM Recipes
                                                        WHERE Recipeid = ${data[1]}
                                                          AND Recipemaker = ${data[0]};`,
          data);
    }
    catch (e) {

    }
    return rows;
  } catch (e) {
    console.error('deleteRecipe', e.message);
    next(httpError('Database error', 500));
  }
};
const deleteRecipeAdmin = async (data, next) => {
  let rows, rows2, rows3;
  try {
    try {
      [rows] = await promisePoolRegUser.execute(`DELETE
                                                       FROM Images
                                                       WHERE Imagerecipe = ${data[1]};`,
          data);
    }
    catch (e) {

    }
    try {
      [rows2] = await promisePoolRegUser.execute(`DELETE
                                                        FROM Recipemealtype
                                                        WHERE Recipeid = ${data[1]};`,
          data);
    }
    catch (e) {

    }
    try {
      [rows3] = await promisePoolRegUser.execute(`DELETE
                                                  FROM Recipefavorite
                                                  WHERE Recipeid = ${data[1]};`,
          data);
    }
    catch (e) {

    }
    try {
      let [rows4] = await promisePoolRegUser.execute(`DELETE
                                                  FROM Reciperating
                                                  WHERE Recipeid = ${data[1]};`,
          data);
    }
    catch (e) {

    }
    try {
      let  [rows5] = await promisePoolRegUser.execute(`DELETE
                                                  FROM Commentrating
                                                  WHERE  Commentrating.Commentid IN (
                                                    SELECT Comments.Commentid FROM Comments
                                                    WHERE Commentrecipe = ${data[1]}); ;`,
          data);
    }
    catch (e) {

    }
    try {
      let [rows6] = await promisePoolRegUser.execute(`DELETE
                                                  FROM Comments
                                                  WHERE Commentrecipe = ${data[1]};`,
          data);
    }
    catch (e) {

    }
    try {
      let [rows7] = await promisePoolRegUser.execute(`DELETE
                                                        FROM Recipes
                                                        WHERE Recipeid = ${data[1]};`,
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
  getAllRecipes,
  getRecipesCount,
  addRecipes,
  findRecipesByName,
  findRecipesById,
  updateRecipes,
  getRecipeMealTypes,
  findRecipesByMealType,
  findRecipesByAuthorId,
  findRecipesByCourseCategory,
  deleteRecipeByAuthorId,
  deleteRecipesById,
  getRecipeById,
  getMealtypeByRecipeId,
  getImageByRecipeId,
  getCoursetypeByCourseId,
  addFavorite,
  getFavorite,
  removeFavorite,
  addLike,
  addDislike,
  removePreviousReciperating,
  getReciperatingByUser,
  modifyRecipes,
  verifyRecipeOwnership,
  deleteRecipe,
  deleteRecipeAdmin,
  getRecipemaker,
  getRecipemakerImage,
  modifyRecipesAdmin,
};
