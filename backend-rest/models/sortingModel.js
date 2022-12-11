const poolRegUser = require('../database/db');
const promisePoolRegUser = poolRegUser.promise();

const getrecipeswiththiscoursetype = async (courseType, next) => {
  try {
    console.log('courseType', courseType)
    const [rows] = await promisePoolRegUser.execute(`SELECT Normaluserview.Recipename , Normaluserview.Recipeprice, Normaluserview.Recipetime, Normaluserview.Recipeguide,Normaluserview.Username,Normaluserview.Imagefilepath,Normaluserview.Coursetype,Normaluserview.Mealtype FROM Normaluserview WHERE Coursetype LIKE "${courseType}%" GROUP BY Normaluserview.Recipename`);
    return rows;
  } catch (e) {
    return next(e);
  }
};
const getrecipeswiththismealtype = async (mealType, next) => {
  try {
    console.log('mealtype', mealType)
    const [rows] = await promisePoolRegUser.execute(`SELECT Normaluserview.Recipename , Normaluserview.Recipeprice, Normaluserview.Recipetime, Normaluserview.Recipeguide,Normaluserview.Username,Normaluserview.Imagefilepath,Normaluserview.Coursetype,Normaluserview.Mealtype FROM Normaluserview WHERE mealtype LIKE "${mealType}%" GROUP BY Normaluserview.Recipename`);
    return rows;
  } catch (e) {
    return next(e);
  }
};
const getrecipeswiththislowrecipepriceto0 = async (recipePrice, next) => {
  try {
    console.log('recipePrice', recipePrice)
    const [rows] = await promisePoolRegUser.execute(`SELECT Normaluserview.Recipename , Normaluserview.Recipeprice, Normaluserview.Recipetime, Normaluserview.Recipeguide,Normaluserview.Username,Normaluserview.Imagefilepath,Normaluserview.Coursetype,Normaluserview.Mealtype FROM Normaluserview  WHERE Normaluserview.Recipeprice <= "${recipePrice}" and Normaluserview.Recipeprice  >= 0  GROUP BY Normaluserview.Recipeprice`);
    return rows;
  } catch (e) {
    return next(e);
  }
};



module.exports = {
  getrecipeswiththiscoursetype,
  getrecipeswiththismealtype,
  getrecipeswiththislowrecipepriceto0,
};