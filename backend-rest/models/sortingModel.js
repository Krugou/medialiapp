const poolRegUser = require('../database/db');
const promisePoolRegUser = poolRegUser.promise();

const getrecipeswiththiscoursetype = async (courseType, next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(`SELECT Recipes.Recipeid,Recipes.Recipename , Recipes.Recipetime, Recipes.Recipeguide, Recipes.Recipemaker, Courses.Coursetype, Mealtypes.Mealtype, Images.Imagefilepath
FROM Recipes INNER JOIN Recipemealtype
    INNER JOIN Mealtypes  INNER JOIN Courses ON Recipes.Recipecourse = Courses.Courseid   INNER JOIN Images
    ON  Recipes.Recipeid = Images.ImageRecipe WHERE Courses.Coursetype LIKE "${courseType}%" GROUP BY Recipeid DESC`);
    return rows;
  } catch (e) {
    return next(e);
  }
};
const getrecipeswiththismealtype = async (mealType, next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(`SELECT m.'Mealid', m.'Mealtype', r.'Recipeid', r.'Mealid', r1.'Recipeid', r1.'Recipename', r1.'Recipetime', r1.'Recipeguide', r1.'Recipemaker', r1.'Recipecourse', i.'Imageid', i.'Imagefilepath', i.'Imagerecipe', u.'Useremail'
FROM jakrecipes.mealtypes m 
	INNER JOIN jakrecipes.recipemealtype r ON ( r.'Mealid' = m.'Mealid'  )  
	INNER JOIN jakrecipes.recipes r1 ON ( r1.'Recipeid' = r.'Recipeid'  )  
	INNER JOIN jakrecipes.courses c ON ( c.'Courseid' = r1.'Recipecourse'  )  
	INNER JOIN jakrecipes.images i ON ( i.'Imagerecipe' = r1.'Recipeid' )  
	INNER JOIN jakrecipes.users u ON ( u.'Userimg' = i.'Imageid'  )  WHERE Mealtypes.Mealtype LIKE "$mealType}%" GROUP BY Recipeid DESC`);
    return rows;
  } catch (e) {
    return next(e);
  }
};
const getrecipeswiththislowrecipepriceto0 = async (recipePrice, next) => {
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

const getrecipeswiththishighrecipepriceto100 = async (recipePrice, next) => {
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
  getrecipeswiththiscoursetype,
  getrecipeswiththismealtype,
  getrecipeswiththislowrecipepriceto0,
  getrecipeswiththishighrecipepriceto100,
};