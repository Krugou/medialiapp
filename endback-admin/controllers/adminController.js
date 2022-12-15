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
    const allthecounts = await getCounts();
    res.json(allthecounts);
  } catch (e) {
    next(httpError('Virhe haettaessa admin-tietoja', 500));
  }
};
const getAdminDataUptime = async (req, res, next) => {
  try {
    const uptime = await getUptime();
    res.json(uptime);
  } catch (e) {
    next(httpError('Virhe haettaessa admin-tietoja', 500));
  }
};
const getAdminDataAllusers = async (req, res, next) => {
  try {
    const allusers = await getAllusers();
    res.json(allusers);
  } catch (e) {
    next(httpError('Virhe haettaessa admin-tietoja', 500));
  }
};
const getAdminDataAllrecipeData = async (req, res, next) => {
  try {
    const allrecipes = await getAllrecipeData();
    res.json(allrecipes);
  } catch (e) {
    next(httpError('Virhe haettaessa admin-tietoja', 500));
  }
};
const getAdminDataAllcommentswithauthors = async (req, res, next) => {

  try {
    const allcomments = await getAllcommentswithauthors();
    res.json(allcomments);
  } catch (e) {
    next(httpError('Virhe haettaessa admin-tietoja', 500));
  }
};
// delete admin data

const delete_users = async (req, res, next) => {
  try {
    const userid = [
      req.params.id,

    ];
    const [rows] = await deleteusers(userid);
    res.json(rows);
  } catch (e) {
    next(httpError('Virhe poistaessa käyttäjää', 500));
  }
};
const delete_comments = async (req, res, next) => {
  try {
    const commentid = [
      req.params.id,

    ];
    const [rows] = await deletecomments(commentid);
    res.json(rows);
  } catch (e) {
    next(httpError('Virhe poistaessa kommenttia', 500));
  }
};
const delete_recipes = async (req, res, next) => {
  try {
    const data = [
      req.params.id,

    ];
    const [rows] = await deleterecipes(data);
    res.json(rows);
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
