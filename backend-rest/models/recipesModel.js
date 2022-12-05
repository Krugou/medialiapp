'use strict'
const poolRegUser = require('../database/db');
const poolUser = require('../database/db');
const pooladmin = require('../database/db');
const { httpError } = require("../utils/errors");
const promisePoolAdmin = pooladmin.promise();
const promisePoolRegUser = poolRegUser.promise();
const promisePoolUser = poolUser.promise();



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
}

const getRecipesCount = async (next) => {
    try {
        const [rows] = await promisePoolAdmin.execute('SELECT COUNT(*) AS count FROM Recipes');
        console.log('count ', rows[0].count);
        return rows[0].count;
    } catch (e) {
        console.error('getRecipesCount', e.message);
        next(httpError('Database error', 500));
    }
}
const getRecipeMealTypes = async (next) => {
    try {
        const [rows] = await promisePoolRegUser.execute(
            `SELECT * FROM Mealtypes;
                        `);
        return rows;
    }
    catch (e) {
        console.error('getMealTypes', e.message);
        next(httpError('Database error', 500));
    }
}


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
}
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
}
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
}

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
}
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
}
const updateRecipes = async (data, next) => {
    console.log("updateRecipes");
    try {
        const [rows] = await promisePoolRegUser.execute(`UPDATE Recipes SET RecipeName = ?, RecipeDescription = ?, RecipeImage = ?, RecipeIngredients = ?, RecipeInstructions = ?, RecipeCategory = ?, RecipeAuthor = ? WHERE RecipeId = ?;`,
            data);
        return rows;
    } catch (e) {
        console.error('updateRecipes', e.message);
        next(httpError('Database error', 500));
    }
}
const deleteRecipesById = async (id, next) => {
    try {
        const [rows] = await promisePoolRegUser.execute(`DELETE FROM Recipes,Users,RecipeMealtype,mealtypes,Images AND Recipes.Recipeid = Images.ImageRecipe  AND Recipes.Recipeid = Recipemealtype.Mealid AND Recipes.Recipemaker = Users.Userid AND Recipemealtype.Mealid = Mealtypes.Mealtype WHERE RecipeId = ?;`,
            id);
        return rows;
    } catch (e) {
        console.error('deleteRecipes', e.message);
        next(httpError('Database error', 500));
    }
}
const deleteRecipeByAuthorId = async (id, next) => {
    try {
        const [rows] = await promisePoolRegUser.execute(`DELETE FROM Recipes,RecipeMealtype,mealtypes,Images AND Recipes.Recipeid = Images.ImageRecipe  AND Recipes.Recipeid = Recipemealtype.Mealid AND Recipes.Recipemaker = Users.Userid AND Recipemealtype.Mealid = Mealtypes.Mealtype WHERE UserId = ?;`,
            id);
        return rows;
    } catch (e) {
        console.error('deleteRecipes', e.message);
        next(httpError('Database error', 500));
    }
}
// ei valmis frontti ohjaus puuttuu
/*
const addRecipes = async (data, next) => {
    try {
        const [rows] = await promisePoolRegUser.execute(`INSERT INTO Recipes (Recipename,Recipetime,Recipeguide,Recipemaker,Recipecourse)
                                                            VALUES ('asdasd',30,'fdsadf',33,4) ;
                                                            INSERT INTO Recipemealtype (Recipeid,Mealid) 
                                                            VALUES ( LAST_INSERT_ID() ,1) ;
                                                            INSERT INTO Images (ImageRecipe ,Imagefilepath) 
                                                            VALUES ( LAST_INSERT_ID() ,'./media/logos/jakRecipesjakRecipesjakRecipeslogo.svg.') ;`,
            data);
        return rows;
    } catch (e) {
        console.error('addRecipes', e.message);
        next(httpError('Database error', 500));
    }
}

 */
const addRecipes = async (data, next) => {
    try {
        console.log("addrecipes asd", data);

        /*
                const [rows] = await promisePoolRegUser.execute(`INSERT INTO Recipes (Recipename, Recipeguide, Recipecourse, Recipetime, Recipemaker)
                                                                    VALUES ("asd", "jep", 1, "232", 32);`, data


                );
                */
        const [rows] = await promisePoolRegUser.execute(` 
                                                        INSERT INTO Recipes (Recipename, Recipeguide, Recipecourse, Recipetime, Recipemaker)
                                                         VALUES ("${data[0]}", "${data[1]}", 4, "${data[3]}", 32);
                                                         INSERT INTO Recipemealtype (recipeid,mealid) VALUES ( LAST_INSERT_ID() ,1);
                                                        INSERT INTO images (Images.Imagerecipe ,Images.Imagefilepath)
                                                        VALUES ( LAST_INSERT_ID() ,'./media/logos/jakrecipeslogo.svg');
                                                        `, data);
                                                          

        console.log("addrecipes", rows);

        return rows;
    } catch (e) {
        console.error('addRecipes input', e.message);
        next(httpError('Database error', 500));
    }
}


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
    deleteRecipesById


};
