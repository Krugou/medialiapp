'use strict';
const {
  addUsersRegUser,
  findUsersByEmailRegUser,
  findUsersByUsernameRegUser,
  getRegUserProfileImage,
  getRegUserProfileUsername, getAllUserInfo,
  deleteUsersRegUser, putNewwProfileDetails

} = require('../models/regUserModel');
const {
  getLimitedUserInfo,
} = require('../models/normalUserModel');
const { validationResult } = require('express-validator');
const { httpError } = require('../utils/errors');
const bcrypt = require('bcryptjs');
const putNewProfileDetails = async (req, res, next) => {
  // check if username exists

  const errors = validationResult(req);
  if (!errors.isEmpty()) {

    console.error('putNewProfileDetails validation', errors.array());
    res.json({
      message: 'Check email, password & username again',
    });
    next(httpError('Invalid data', 400));
    return;
  }
  try {

    const result = await findUsersByUsernameRegUser(req.body.Username, next);
    if (result.length > 0) {
      res.json({
        message: 'Username already exists',
      });
      next(httpError('Username already exists', 400));
      return;
    }
    let data = [req.body.Username, req.body.oldUsername]

    // console.log("🚀 ~ file: userController.js:56 ~ putNewProfileDetails ~ data", data)
    const result2 = await putNewwProfileDetails(data, next);
    // console.log("🚀 ~ file: userController.js:48 ~ putNewProfileDetails ~ result2", result2)
    res.json(result2);
  } catch (e) {
    console.error('putNewProfileDetails', e.message);
    next(httpError('Internal server error', 500));
  }

};

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

const get_UserProfileLimited = async (req, res, next) => {

  try {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors.
      // Error messages can be returned in an array using `errors.array()`.
      console.error('get_UserProfileLimited validation', errors.array());
      res.json({
        message: 'Check email, password & username again',
      });
      next(httpError('Invalid data', 400));
      return;
    }

    let result = await getLimitedUserInfo(req.params.username, next);
          result = {
      info:result[0],
      image:result,
    }
    if (result.length < 1) {
      res.json({
        Username: 'undefined',
      });
      next(httpError('No username found', 404));
      return;
    }
    res.json(result);
  } catch (e) {
    next(httpError('get_UserProfileLimited', 404));
  }
};
const get_UserProfile = async (req, res, next) => {
  let result, result2;
  try {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors.
      // Error messages can be returned in an array using `errors.array()`.
      console.error('get_UserProfile validation', errors.array());
      res.json({
        message: 'Check email, password & username again',
      });
      next(httpError('Invalid data', 400));
      return;
    }

    if (req.user.Username === req.params.username){
      console.log("ASDASDADSD");
      result = await getAllUserInfo(req.params.username, next);
      result2 = await getLimitedUserInfo(req.params.username, next);
      result = {
        info:result,
        image:result2,
      }
    } else {
       result = await getLimitedUserInfo(req.params.username, next);
       console.log("resultennen", result);
      result = {
        info:result[0],
        image:result,
      }
    }

    console.log("result", result);
    if (result.length < 1) {
      res.json({
        Username: 'undefined',
      });
      next(httpError('No username found', 404));
      return;
    }
    res.json(result);
  } catch (e) {
    next(httpError('get_UserProfile', 404));
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
const check_token = (req, res, next) => {
  if (!req.user) {
    next(httpError('token not valid', 403));
  } else {
    res.json({ user: req.user });
  }
};
const deleteUsersReg_User = async (req, res, next) => {
  try {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors.
      // Error messages can be returned in an array using `errors.array()`.
      console.error('deleteUsersReg_User validation', errors.array());
      res.json({
        message: 'Check email, password & username again',
      });
      next(httpError('Invalid data', 400));
      return;
    }
    const result = await deleteUsersRegUser(req.params.username, next);
    if (result.affectedRows < 1) {
      res.json({
        message: 'Invalid data',
      });
      next(httpError('Invalid data', 400));
    }
    res.json({
      message: 'User Deleted',
    });
  } catch (e) {
    console.error('deleteUsersReg_User', e.message);
    next(httpError('Internal server error', 500));
  }
};

module.exports = {
  user_post,
  getReg_UserDetailImage,
  getReg_UserDetailUsername,
  get_UserProfile,
  check_token,
  get_UserProfileLimited,
  deleteUsersReg_User,
  putNewProfileDetails,
};