'use strict';

const pooladmin = require('../database/db');
const promisePoolAdmin = pooladmin.promise();

const getCounts = async () => {
  try {
    // Step 1: Declare the function to retrieve the data
const [allthecounts] = await promisePoolAdmin.execute(
      'SELECT * FROM `jakrecipes`.`allthecounts`;');

// Step 2: Return the data
return allthecounts;
  } catch (e) {
    console.error('error getAdminCounts', e.message);
  }
};
const getUptime = async () => {
  try {
    const [uptime] = await promisePoolAdmin.execute(
  'show status LIKE "uptime%";' // 1. Execute a SQL statement that returns the uptime of the database server.
);
return uptime; // 2. Return the uptime of the database server.
  } catch (e) {
    console.error('error getUptime', e.message);
  }
};
const getAllusers = async () => {
  try {
    const [allusers] = await promisePoolAdmin.execute(
  // Query to execute
  'SELECT distinct * FROM `jakrecipes`.`Users` order by Userid desc;',
);
// Return the results of the query
return allusers;
  } catch (e) {
    console.error('error getAllusers', e.message);
  }
};
const getAllrecipeData = async () => {
  try {
   // query the database to get all recipes
const [allrecipes] = await promisePoolAdmin.execute(
// select all columns from Recipes table, and join with Recipemealtype, Mealtypes and Courses tables to get the coursetype, mealtype and imagefilepath
// join with Images table to get the imagefilepath
// group by Recipeid to avoid duplicates
// order by Recipeid to get the most recent recipes first
  'SELECT Recipes.Recipeid,Recipes.Recipename , Recipes.Recipetime, Recipes.Recipeguide, Recipes.Recipemaker, Courses.Coursetype, Mealtypes.Mealtype, Images.Imagefilepath FROM Recipes INNER JOIN Recipemealtype  INNER JOIN Mealtypes  INNER JOIN Courses ON Recipes.Recipecourse = Courses.Courseid   INNER JOIN Images  ON  Recipes.Recipeid = Images.ImageRecipe GROUP BY Recipeid order by Recipeid desc ;');
// return the results
return allrecipes;
  } catch (e) {
    console.error('error getAllrecipes', e.message);
  }
};
const getAllcommentswithauthors = async () => {
  try {
    //get all comments
const [allcomments] = await promisePoolAdmin.execute(
      'SELECT distinct * FROM `jakrecipes`.`Comments` inner join Users on Comments.Commentuserid = Users.Userid  order by Commentid desc;');

//return all comments
    return allcomments;
  } catch (e) {
    console.error('error getAllcomments', e.message);
  }
};

module.exports = {

  getCounts,
  getUptime,
  getAllusers,
  getAllrecipeData,
  getAllcommentswithauthors,

};
