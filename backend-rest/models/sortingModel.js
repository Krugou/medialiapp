const poolRegUser = require('../database/db');
const promisePoolRegUser = poolRegUser.promise();
const httpError = require('http-errors');
const getrecipeswiththiscoursetype = async (courseType, next) => {
  try {
    console.log('courseType', courseType)
    const [rows] = await promisePoolRegUser.execute(`SELECT normaluserview.Recipeid, normaluserview.Recipename , normaluserview.Recipeprice, normaluserview.Recipetime, normaluserview.Recipeguide,normaluserview.Username,normaluserview.Imagefilepath,normaluserview.Coursetype,normaluserview.Mealtype FROM normaluserview WHERE Coursetype LIKE "${courseType}%" GROUP BY normaluserview.Recipeid order by normaluserview.Recipeid desc`);
    return rows;
  } catch (e) {
    next(httpError('Database error', 500));
  }
};
const getrecipeswiththismealtype = async (mealType, next) => {
  try {
    console.log('mealtype', mealType)
    const [rows] = await promisePoolRegUser.execute(`SELECT normaluserview.Recipeid,  normaluserview.Recipename , normaluserview.Recipeprice, normaluserview.Recipetime, normaluserview.Recipeguide,normaluserview.Username,normaluserview.Imagefilepath,normaluserview.Coursetype,normaluserview.Mealtype FROM normaluserview WHERE Mealtype LIKE "${mealType}%" GROUP BY normaluserview.Recipeid order by normaluserview.Recipeid desc`);
    return rows;
  } catch (e) {
    next(httpError('Database error', 500));
  }
};
const getrecipeswiththislowrecipepriceto0 = async (recipePrice, next) => {
  try {
    console.log('recipePrice', recipePrice)
    const [rows] = await promisePoolRegUser.execute(`SELECT normaluserview.Recipeid, normaluserview.Recipename , normaluserview.Recipeprice, normaluserview.Recipetime, normaluserview.Recipeguide,normaluserview.Username,normaluserview.Imagefilepath,normaluserview.Coursetype,normaluserview.Mealtype FROM normaluserview  WHERE normaluserview.Recipeprice <= "${recipePrice}" and normaluserview.Recipeprice  >= 0  GROUP BY normaluserview.Recipeprice order by normaluserview.Recipeprice desc`);
    return rows;
  } catch (e) {
    next(httpError('Database error', 500));;
  }
};
const getuserfavorites = async (userid, next) => {
  try {
    console.log('userid', userid)
    const [rows] = await promisePoolRegUser.execute(`
SELECT * FROM Recipes WHERE Recipeid IN
(SELECT Recipeid FROM Recipefavorite WHERE userid = "${userid}");`);
    return rows;
  } catch (e) {
    next(httpError('Database error', 500));
  }
};

const getmostlikedrecipes = async (next) => {
  try {
    console.log('userid', userid)
    const [rows] = await promisePoolRegUser.execute(`
SELECT Recipeid, COUNT(*) FROM recipefavorite GROUP BY Recipeid;
`);
    return rows;
  } catch (e) {
    next(httpError('Database error', 500));
  }
};





module.exports = {
  getrecipeswiththiscoursetype,
  getrecipeswiththismealtype,
  getrecipeswiththislowrecipepriceto0,
  getuserfavorites,
  getmostlikedrecipes
};