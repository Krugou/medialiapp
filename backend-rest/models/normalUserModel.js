const poolUser = require('../database/db');
const promisePoolUser = poolUser.promise();
const httpError = require('http-errors');

// pääsivu  komento
const getAllNewestRecipesMainPage = async (next) => {
  try {
    const [rows] = await promisePoolUser.execute(`SELECT Normaluserview.Recipeid,  Normaluserview.Recipename , Normaluserview.Recipeprice, Normaluserview.Recipetime, Normaluserview.Recipeguide,Normaluserview.Username,Normaluserview.Imagefilepath,Normaluserview.Coursetype,Normaluserview.Mealtype FROM Normaluserview  GROUP BY Normaluserview.Recipename   desc limit 6 `);
    console.log('Someone is at our frontpage');
    return rows;
  } catch (e) {
    console.error('getAllRecipes', e.message);
    next(httpError('Database error', 500));
  }
};
const getAllOldestRecipesMainPage = async (next) => {
  try {
    const [rows] = await promisePoolUser.execute(`SELECT Normaluserview.Recipeid,  Normaluserview.Recipename , Normaluserview.Recipeprice, Normaluserview.Recipetime, Normaluserview.Recipeguide,Normaluserview.Username,Normaluserview.Imagefilepath,Normaluserview.Coursetype,Normaluserview.Mealtype FROM Normaluserview  GROUP BY Normaluserview.Recipename asc limit 6   `);
    console.log('Someone is at our frontpage');
    return rows;
  } catch (e) {
    console.error('getAllRecipes', e.message);
    next(httpError('Database error', 500));
  }
};
const getRecipesByRecipeName = async (recipeName, next) => {
  try {
    console.log('Searched recipe name is: ' + recipeName);

    const [rows] = await promisePoolUser.execute(`SELECT Normaluserview.Recipeid,  Normaluserview.Recipename , Normaluserview.Recipeprice, Normaluserview.Recipetime, Normaluserview.Recipeguide,Normaluserview.Username,Normaluserview.Imagefilepath,Normaluserview.Coursetype,Normaluserview.Mealtype FROM Normaluserview
                                                        WHERE Normaluserview.Recipename  like "%${recipeName}%" GROUP BY Recipeid DESC`);
    return rows;
  } catch (e) {
    console.error('Filtering recipes by name', e.message);
    next(httpError('Database error', 500));
  }

};

module.exports = {

  getAllNewestRecipesMainPage,
  getAllOldestRecipesMainPage,
  getRecipesByRecipeName,

};
