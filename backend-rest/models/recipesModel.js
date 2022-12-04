const poolRegUser = require('../database/db');
const poolUser = require('../database/db');
const pooladmin = require('../database/db');
const promisePoolAdmin = pooladmin.promise();
const promisePoolRegUser = poolRegUser.promise();
const promisePoolUser = poolUser.promise();

// pääsivu  komento
const getAllRecipesMainPage = async (next) => {
    try {
        const [rows] = await promisePoolUser.execute(`SELECT recipes.Recipeid,recipes.Recipename , recipes.Recipetime, recipes.Recipeguide, recipes.Recipemaker, courses.coursetype, mealtypes.Mealtype, images.Imagefilepath
FROM recipes 

 INNER JOIN recipemealtype ON recipes.Recipeid = recipemealtype.Recipeid 
  INNER JOIN mealtypes 
  INNER JOIN courses ON recipes.Recipecourse = courses.Courseid   INNER JOIN images ON  recipes.Recipeid = images.Imagerecipe ORDER BY Recipeid DESC limit 6 `);
        return rows;
    } catch (e) {
        console.error('getAllRecipes', e.message);
        next(httpError('Database error', 500));
    }
}

// admin komento 
const getAllRecipes = async (next) => {
    try {
        const [rows] = await promisePoolAdmin.execute(`SELECT *
FROM recipes 
 INNER JOIN  users  on recipes.recipemaker = users.Userid 
 INNER JOIN recipemealtype ON recipes.Recipeid = recipemealtype.Recipeid 
  INNER JOIN mealtypes 
  INNER JOIN courses ON recipes.Recipecourse = courses.Courseid   INNER JOIN images ON  recipes.Recipeid = images.Imagerecipe `);
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
        const [rows] = await promisePoolRegUser.execute(`SELECT *
                                                FROM Recipes WHERE RecipeName = "${name}";
                                                `);
        return rows;
    } catch (e) {
        console.error('findRecipesByName', e.message);
        next(httpError('Database error', 500));
    }
}
const findRecipesByCourseCategory = async (name, next) => {
    try {
        const [rows] = await promisePoolRegUser.execute(`SELECT *
                                                FROM Recipes INNER JOIN courses on recipes.Recipecourse = courses.Courseid  WHERE courses.Coursetype = "${name}";
                                                `);
        return rows;
    } catch (e) {
        console.error('findRecipesByCourseCategory', e.message);
        next(httpError('Database error', 500));
    }
}
const findRecipesByMealType = async (name, next) => {
    try {
        const [rows] = await promisePoolRegUser.execute(`SELECT recipename, recipetime,recipeguide,recipemaker,recipecourse,mealtype,imagefilepath
FROM recipes INNER JOIN users ON recipes.recipemaker = users.Userid INNER JOIN recipemealtype on recipes.Recipeid = recipemealtype.Mealid INNER JOIN mealtypes on recipemealtype.Mealid = mealtypes.Mealtype INNER JOIN images on recipes.Recipeid = images.Imagerecipe   WHERE mealtypes.Mealtype = "${name}";
                                                `);
        return rows;
    } catch (e) {
        console.error('findRecipesByMealType', e.message);
        next(httpError('Database error', 500));
    }
}

const findRecipesByAuthorId = async (name, next) => {
    try {
        const [rows] = await promisePoolRegUser.execute(`SELECT recipename, recipetime,recipeguide,recipemaker,recipecourse,mealtype,imagefilepath
FROM recipes INNER JOIN users ON recipes.recipemaker = users.Userid INNER JOIN recipemealtype on recipes.Recipeid = recipemealtype.Mealid INNER JOIN mealtypes on recipemealtype.Mealid = mealtypes.Mealtype INNER JOIN images on recipes.Recipeid = images.Imagerecipe     WHERE users.Userid = "${name};
                                                `);
        return rows;
    } catch (e) {
        console.error('findRecipesByAuthor', e.message);
        next(httpError('Database error', 500));
    }
}
const findRecipesById = async (id, next) => {
    try {
        const [rows] = await promisePoolRegUser.execute(`SELECT recipename, recipetime,recipeguide,recipemaker,recipecourse,mealtype,imagefilepath
        from recipes
INNER JOIN users ON recipes.Recipemaker = users.Userid
INNER JOIN recipemealtype  
INNER JOIN mealtypes   
INNER JOIN courses INNER JOIN images   WHERE recipes.recipeid = "${name};
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
        const [rows] = await promisePoolRegUser.execute(`DELETE FROM Recipes,users,recipemealtype,mealtypes,images AND recipes.Recipeid = images.Imagerecipe  AND recipes.Recipeid = recipemealtype.Mealid AND recipes.recipemaker = users.Userid AND recipemealtype.Mealid = mealtypes.Mealtype WHERE RecipeId = ?;`,
            id);
        return rows;
    } catch (e) {
        console.error('deleteRecipes', e.message);
        next(httpError('Database error', 500));
    }
}
const deleteRecipeByAuthorId = async (id, next) => {
    try {
        const [rows] = await promisePoolRegUser.execute(`DELETE FROM Recipes,recipemealtype,mealtypes,images AND recipes.Recipeid = images.Imagerecipe  AND recipes.Recipeid = recipemealtype.Mealid AND recipes.recipemaker = users.Userid AND recipemealtype.Mealid = mealtypes.Mealtype WHERE UserId = ?;`,
            id);
        return rows;
    } catch (e) {
        console.error('deleteRecipes', e.message);
        next(httpError('Database error', 500));
    }
}
// ei valmis frontti ohjaus puuttuu
const addRecipes = async (data, next) => {
    try {
        const [rows] = await promisePoolRegUser.execute(`INSERT INTO recipes (recipename,recipetime,recipeguide,recipemaker,recipecourse)
VALUES ('asdasd',30,'fdsadf',33,4) ;
INSERT INTO recipemealtype (Recipeid,mealid) 
VALUES ( LAST_INSERT_ID() ,1) ;
INSERT INTO images (imagerecipe,imagefilepath) 
VALUES ( LAST_INSERT_ID() ,'./imagetest5.jpg') ;`,
            data);
        return rows;
    } catch (e) {
        console.error('addRecipes', e.message);
        next(httpError('Database error', 500));
    }
}



module.exports = {
    getAllRecipes,
    getRecipesCount,
    addRecipes,
    getAllRecipesMainPage,
    findRecipesByName,
    findRecipesByCourseCategory,
    addRecipes,
    findRecipesById,
    updateRecipes,
    getRecipeMealTypes,
    findRecipesByMealType,
    findRecipesByAuthorId,
    findRecipesByCourseCategory,
    deleteRecipeByAuthorId,
    deleteRecipesById


};
