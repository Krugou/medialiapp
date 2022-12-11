const poolRegUser = require('../database/db');
const promisePoolRegUser = poolRegUser.promise();

const getrecipesbycoursetype = async (courseType, next) => {
    try {
        const [rows] = await promisePoolRegUser.execute(`SELECT Recipes.Recipeid,Recipes.Recipename , Recipes.Recipetime, Recipes.Recipeguide, Recipes.Recipemaker, Courses.Coursetype, Mealtypes.Mealtype, Images.Imagefilepath
FROM Recipes INNER JOIN Recipemealtype
    INNER JOIN Mealtypes  INNER JOIN Courses ON Recipes.Recipecourse = Courses.Courseid   INNER JOIN Images
    ON  Recipes.Recipeid = Images.ImageRecipe WHERE Courses.Coursetype = "${courseType}" GROUP BY Recipeid DESC`);
        return rows;
    } catch (e) {
        return next(e);
    }
};
const getrecipesbymealtype = async (mealType, next) => {
    try {
        const [rows] = await promisePoolRegUser.execute(`SELECT Recipes.Recipeid,Recipes.Recipename , Recipes.Recipetime, Recipes.Recipeguide, Recipes.Recipemaker, Courses.Coursetype, Mealtypes.Mealtype, Images.Imagefilepath
FROM Recipes INNER JOIN Recipemealtype
    INNER JOIN Mealtypes  INNER JOIN Courses ON Recipes.Recipecourse = Courses.Courseid   INNER JOIN Images
    ON  Recipes.Recipeid = Images.ImageRecipe WHERE Mealtypes.Mealtype = "${mealType}" GROUP BY Recipeid DESC`);
        return rows;
    } catch (e) {
        return next(e);
    }
};
const getrecipesbylowrecipepriceto0 = async (recipePrice, next) => {
    try {
        const [rows] = await promisePoolRegUser.execute(`SELECT Recipes.Recipeid,Recipes.Recipename , Recipes.Recipetime, Recipes.Recipeguide, Recipes.Recipemaker, Courses.Coursetype, Mealtypes.Mealtype, Images.Imagefilepath
FROM Recipes INNER JOIN Recipemealtype
    INNER JOIN Mealtypes  INNER JOIN Courses ON Recipes.Recipecourse = Courses.Courseid   INNER JOIN Images
    ON  Recipes.Recipeid = Images.ImageRecipe WHERE Recipes.Recipeprice >= "${recipePrice}" and Recipes.Recipeprice <= 0  GROUP BY Recipeprice DESC`);
        return rows;
    } catch (e) {
        return next(e);
    }
};

        
const getrecipesbyhighrecipepriceto100 = async (recipePrice, next) => {
    try {
        const [rows] = await promisePoolRegUser.execute(`SELECT Recipes.Recipeid,Recipes.Recipename , Recipes.Recipetime, Recipes.Recipeguide, Recipes.Recipemaker, Courses.Coursetype, Mealtypes.Mealtype, Images.Imagefilepath
FROM Recipes INNER JOIN Recipemealtype
    INNER JOIN Mealtypes  INNER JOIN Courses ON Recipes.Recipecourse = Courses.Courseid   INNER JOIN Images
    ON  Recipes.Recipeid = Images.ImageRecipe WHERE Recipes.Recipeprice >= "${recipePrice}" and Recipes.Recipeprice <= 100  GROUP BY Recipeprice DESC`);
        return rows;
    } catch (e) {
        return next(e);
    }
};

module.exports = {
    getrecipesbycoursetype,
    getrecipesbymealtype,
    getrecipesbylowrecipepriceto0,
    getrecipesbyhighrecipepriceto100
};