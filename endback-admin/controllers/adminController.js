'use strict';
const {
  getCounts,
  getUptime,
  getAllusers,
  getAllrecipeData,
  getAllcommentswithauthors,
} = require('../models/getAdminDataModel');
const {validationResult} = require('express-validator');
const {httpError} = require('../utils/errors');

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

module.exports = {
  getAdminDataCounts,
  getAdminDataUptime,
  getAdminDataAllusers,
  getAdminDataAllrecipeData,
  getAdminDataAllcommentswithauthors,

};
