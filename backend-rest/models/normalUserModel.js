const poolUser = require('../database/db');
const promisePoolUser = poolUser.promise();


// pääsivu  komento
const getAllNewestRecipesMainPage = async (next) => {
    try {
        const [rows] = await promisePoolUser.execute(`SELECT Recipes.Recipeid,Recipes.Recipename , Recipes.Recipetime, Recipes.Recipeguide, Recipes.Recipemaker, Courses.Coursetype, Mealtypes.Mealtype, Images.Imagefilepath
FROM Recipes INNER JOIN Recipemealtype  
  INNER JOIN Mealtypes  INNER JOIN Courses ON Recipes.Recipecourse = Courses.Courseid   INNER JOIN Images
  ON  Recipes.Recipeid = Images.ImageRecipe GROUP BY Recipeid DESC limit 6  `);
        console.log('Someone is at our frontpage');
        return rows;
    } catch (e) {
        console.error('getAllRecipes', e.message);
        next(httpError('Database error', 500));
    }
}
const getAllOldestRecipesMainPage = async (next) => {
    try {
        const [rows] = await promisePoolUser.execute(`SELECT Recipes.Recipeid,Recipes.Recipename , Recipes.Recipetime, Recipes.Recipeguide, Recipes.Recipemaker, Courses.Coursetype, Mealtypes.Mealtype, Images.Imagefilepath
FROM Recipes INNER JOIN Recipemealtype  
  INNER JOIN Mealtypes  INNER JOIN Courses ON Recipes.Recipecourse = Courses.Courseid   INNER JOIN Images
  ON  Recipes.Recipeid = Images.ImageRecipe GROUP BY Recipeid asc limit 6   `);
        console.log('Someone is at our frontpage');
        return rows;
    } catch (e) {
        console.error('getAllRecipes', e.message);
        next(httpError('Database error', 500));
    }
}

module.exports = {

    getAllNewestRecipesMainPage,
    getAllOldestRecipesMainPage,


};
