const poolUser = require('../database/db');
const promisePoolUser = poolUser.promise();

const fetchAllRecipes = async (next) => {
    try {
        const [rows] = await promisePoolUser.execute(`SELECT *
                                                FROM Recipes;
                                                `);
        return rows;
    } catch (e) {
        console.error('fetchAllRecipes', e.message);
        next(httpError('Database error', 500));
    }
};
// pääsivu  komento
const getAllRecipesMainPage = async (next) => {
    try {
        const [rows] = await promisePoolUser.execute(`SELECT Recipes.Recipeid,Recipes.Recipename , Recipes.Recipetime, Recipes.Recipeguide, Recipes.Recipemaker, Courses.Coursetype, Mealtypes.Mealtype, Images.Imagefilepath
FROM Recipes INNER JOIN Recipemealtype  
  INNER JOIN Mealtypes  INNER JOIN Courses ON Recipes.Recipecourse = Courses.Courseid   INNER JOIN Images
  ON  Recipes.Recipeid = Images.ImageRecipe GROUP BY Recipeid DESC ');
        return rows;
    } catch (e) {
        console.error('getAllRecipes', e.message);
        next(httpError('Database error', 500));
    }
}

module.exports = {

    fetchAllRecipes,
    getAllRecipesMainPage,


};
