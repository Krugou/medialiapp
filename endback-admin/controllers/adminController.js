'use strict';
const {
  getCounts,
  getUptime,
  getAllusers,
  getAllrecipeData,
  getAllcommentswithauthors,
} = require('../models/getAdminDataModel');
const { deleteusers, deletecomments, deleterecipes } = require('../models/deleteAdmindatamodel');
const { validationResult } = require('express-validator');
const { httpError } = require('../utils/errors');
// get admin data
const getAdminDataCounts = async (req, res, next) => {
  try {
    // Get all counts
    const allthecounts = await getCounts();
    // Send the result back to the client
    res.json(allthecounts);
  } catch (e) {
    // If an error occurs, return an HTTP 500 error to the client
    next(httpError('Virhe haettaessa admin-tietoja', 500));
  }
};
// Fetches uptime and sends it to the client
const getAdminDataUptime = async (req, res, next) => {
  try {
    // Get uptime from the database
    const uptime = await getUptime();
    // Send uptime to the client
    res.json(uptime);
  } catch (e) {
    // Handle errors
    next(httpError('Virhe haettaessa admin-tietoja', 500));
  }
};
const getAdminDataAllusers = async (req, res, next) => {
  try {
    // Get all users from the database
    const allusers = await getAllusers();
    // Send the information to the client
    res.json(allusers);
  } catch (e) {
    // If an error occurs, send a 500 error to the client
    next(httpError('Virhe haettaessa admin-tietoja', 500));
  }
};
const getAdminDataAllrecipeData = async (req, res, next) => {
  try {
    // get all recipe data from the database
    const allrecipes = await getAllrecipeData();
    // send the recipe data to the client
    res.json(allrecipes);
  } catch (e) {
    next(httpError('Virhe haettaessa admin-tietoja', 500));
  }
};
const getAdminDataAllcommentswithauthors = async (req, res, next) => {

  try {
    // Get all comments from the database
    const allcomments = await getAllcommentswithauthors();

    // Send the comments as a JSON response
    res.json(allcomments);
  } catch (e) {
    next(httpError('Virhe haettaessa admin-tietoja', 500));
  }
};
// delete admin data

const delete_users = async (req, res, next) => {
  try {
    // Get the id from the request
    const userid = [
      req.params.id,
    ];
    // Call the deleteusers function with the id
    const [rows] = await deleteusers(userid);
    // Send the result back to the client
    res.json(rows);
  } catch (e) {
    next(httpError('Virhe poistaessa käyttäjää', 500));
  }
};
const delete_comments = async (req, res, next) => {
  try {
    const commentid = [ // commentid is a variable containing the ID of the comment that is to be deleted
      req.params.id, // req.params.id is the id of the comment that is to be deleted

    ];
    const [rows] = await deletecomments(commentid); // deletecomments is a function that deletes the comment and returns the deleted comment
    res.json(rows); // res.json(rows) returns the deleted comment to the client
  } catch (e) {
    next(httpError('Virhe poistaessa kommenttia', 500));
  }
};
const delete_recipes = async (req, res, next) => {
  try {
    const data = [
      req.params.id,  // id of the recipe to be deleted
    ];
    const [rows] = await deleterecipes(data);  // delete the recipe in the database
    res.json(rows);  // send the result back to the client
  } catch (e) {
    next(httpError('Virhe poistaessa reseptiä', 500));
  }
};


module.exports = {
  getAdminDataCounts,
  getAdminDataUptime,
  getAdminDataAllusers,
  getAdminDataAllrecipeData,
  getAdminDataAllcommentswithauthors,
  delete_users,
  delete_comments,
  delete_recipes,

};
