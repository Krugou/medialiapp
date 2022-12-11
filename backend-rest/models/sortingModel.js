const poolRegUser = require('../database/db');
const promisePoolRegUser = poolRegUser.promise();

const getrecipeswiththiscoursetype = async (courseType, next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(`SELECT Dataview.Recipename , Dataview.Recipeprice, Dataview.Recipetime, dataview.Recipeguide,dataview.Username,dataview.Imagefilepath,dataview.Coursetype,dataview.Mealtype FROM dataview WHERE mealtype LIKE "${courseType}%" GROUP BY dataview.Recipename`);
    return rows;
  } catch (e) {
    return next(e);
  }
};
const getrecipeswiththismealtype = async (mealType, next) => {
  try {
    console.log(mealType)
    const [rows] = await promisePoolRegUser.execute(`SELECT Dataview.Recipename , Dataview.Recipeprice, Dataview.Recipetime, dataview.Recipeguide,dataview.Username,dataview.Imagefilepath,dataview.Coursetype,dataview.Mealtype FROM dataview WHERE mealtype LIKE "${mealType}%" GROUP BY dataview.Recipename`);
    return rows;
  } catch (e) {
    return next(e);
  }
};
const getrecipeswiththislowrecipepriceto0 = async (recipePrice, next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(`SELECT Dataview.Recipename , Dataview.Recipeprice, Dataview.Recipetime, dataview.Recipeguide,dataview.Username,dataview.Imagefilepath,dataview.Coursetype,dataview.Mealtype FROM dataview  WHERE dataview.Recipeprice >= "${recipePrice}" and dataview.Recipeprice <= 0  GROUP BY dataview.Recipeprice`);
    return rows;
  } catch (e) {
    return next(e);
  }
};

const getrecipeswiththishighrecipepriceto100 = async (recipePrice, next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(`SELECT Dataview.Recipename , Dataview.Recipeprice, Dataview.Recipetime, dataview.Recipeguide,dataview.Username,dataview.Imagefilepath,dataview.Coursetype,dataview.Mealtype FROM dataview WHERE dataview.Recipeprice >= "${recipePrice}" and dataview.Recipeprice <= 100  GROUP BY Recipeprice DESC`);
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