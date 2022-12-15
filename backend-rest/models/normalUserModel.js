const poolUser = require('../database/db');
const promisePoolUser = poolUser.promise();
const httpError = require('http-errors');

// pääsivu  komento
const getAllNewestRecipesMainPage = async (next) => {
  try {
    const [rows] = await promisePoolUser.execute(`SELECT normaluserview.Recipeid,  normaluserview.Recipename , normaluserview.Recipeprice, normaluserview.Recipetime, normaluserview.Recipeguide,normaluserview.Username,normaluserview.Imagefilepath,normaluserview.Coursetype,normaluserview.Mealtype FROM normaluserview  GROUP BY normaluserview.Recipeid    desc limit 9 `);
    console.log('Someone is at our frontpage');
    return rows;
  } catch (e) {
    console.error('getAllRecipes', e.message);
    next(httpError('Database error', 500));
  }
};
const getAllOldestRecipesMainPage = async (next) => {
  try {
    const [rows] = await promisePoolUser.execute(`SELECT normaluserview.Recipeid,  normaluserview.Recipename , normaluserview.Recipeprice, normaluserview.Recipetime, normaluserview.Recipeguide,normaluserview.Username,normaluserview.Imagefilepath,normaluserview.Coursetype,normaluserview.Mealtype FROM normaluserview  GROUP BY normaluserview.Recipeid asc limit 6   `);
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

    const [rows] = await promisePoolUser.execute(`SELECT normaluserview.Recipeid,  normaluserview.Recipename , normaluserview.Recipeprice, normaluserview.Recipetime, normaluserview.Recipeguide,normaluserview.Username,normaluserview.Imagefilepath,normaluserview.Coursetype,normaluserview.Mealtype FROM normaluserview
                                                        WHERE normaluserview.Recipename  like "%${recipeName}%" GROUP BY Recipeid DESC`);
    return rows;
  } catch (e) {
    console.error('Filtering recipes by name', e.message);
    next(httpError('Database error', 500));
  }

};
const getLimitedUserInfo = async (username, next) => {
  console.log("username limited", username);
  try {
    let [rows] = await promisePoolUser.execute(` SELECT Images.Imagefilepath, Users.Username FROM Users INNER JOIN Images ON Users.Userimg = Images.Imageid WHERE Username = "${username}"; `);

    if (rows.length<1) {
      rows=[];
    }
    return rows;
  } catch (e) {
    next(httpError('Database error', 500));
  }
};


module.exports = {

  getAllNewestRecipesMainPage,
  getAllOldestRecipesMainPage,
  getRecipesByRecipeName,
  getLimitedUserInfo,

};
