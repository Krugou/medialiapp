'use strict';
const {
  addUsersRegUser,
  findUsersByEmailRegUser,
  findUsersByUsernameRegUser,
  getRegUserProfileImage,
  getRegUserProfileUsername,

} = require('../models/regUserModel');
const { validationResult } = require('express-validator');
const { httpError } = require('../utils/errors');
const bcrypt = require('bcryptjs');

const getReg_UserDetailImage = async (req, res, next) => {
  try {
    const result = await getRegUserProfileImage(req.params.userid, next);
    if (result.length < 1) {
      res.json({
        Imagefilepath: 'undefined',
      });
      next(httpError('No image found', 404));
      return;
    }
    res.json(result);
  } catch (e) {
    res.json({
      Imagefilepath: 'undefined',
    });
  }
};
const getReg_UserDetailUsername = async (req, res, next) => {
  try {
    const result = await getRegUserProfileUsername(req.params.userid, next);
    if (result.length < 1) {
      res.json({
        Username: 'undefined',
      });
      next(httpError('No username found', 404));
      return;
    }
    res.json(result);
  } catch (e) {
    res.json({
      Username: 'undefined',
    });
  }
};
const user_post = async (req, res, next) => {

  try {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors.
      // Error messages can be returned in an array using `errors.array()`.
      console.error('user_post validation', errors.array());
      res.json({
        message: 'Check email, password & username again',
      });
      next(httpError('Invalid data', 400));
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const pwd = bcrypt.hashSync(req.body.password, salt);

    const data = [
      req.body.email,
      pwd,
      req.body.username,
    ];

    const resultFindEmail = await findUsersByEmailRegUser(data[0]);
    console.log(resultFindEmail);
    const resultFindUsername = await findUsersByUsernameRegUser(data[2]);

    if (resultFindUsername.length > 0) {
      res.json({
        message: 'Username is already in use',
      });
      next(httpError('Username is already in use', 400));
      return;
    }

    if (resultFindEmail.length > 0) {
      res.json({
        message: 'Email is already in use',
      });
      next(httpError('Email is already in use', 400));
      return;
    }

    const result = await addUsersRegUser(data, next);
    if (result.affectedRows < 1) {
      res.json({
        message: 'Invalid data',
      });
      next(httpError('Invalid data', 400));
    }

    res.json({
      message: 'User Created',
    });
  } catch (e) {
    console.error('user_post', e.message);
    next(httpError('Internal server error', 500));
  }
};

module.exports = {
  user_post,
  getReg_UserDetailImage,
  getReg_UserDetailUsername,
};