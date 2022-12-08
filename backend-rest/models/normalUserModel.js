const poolUser = require('../database/db');
const promisePoolUser = poolUser.promise();
const httpError = require('http-errors');


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
const getRecipesByRecipeName = async (recipeName, next) => {
    try {
        console.log("Searched recipe name is: " + recipeName)
    
        const [rows] = await promisePoolUser.execute(`SELECT Recipes.Recipeid,Recipes.Recipename , Recipes.Recipetime, Recipes.Recipeguide, Recipes.Recipemaker, Recipes.Recipecourse
                                                        FROM Recipes 
                                                        WHERE Recipes.Recipename  like "%${recipeName}%" GROUP BY Recipeid DESC` );
        return rows;
    } catch (e) {
        console.error('Filtering recipes by name', e.message);
        next(httpError('Database error', 500));
    }


}


module.exports = {

    getAllNewestRecipesMainPage,
    getAllOldestRecipesMainPage,
    getRecipesByRecipeName,


};
