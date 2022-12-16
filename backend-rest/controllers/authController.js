'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');
const {httpError} = require('../utils/errors');
const { validationResult } = require('express-validator');

const login = (req, res, next) => {

  // Extract the validation errors from a request.
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // There are errors.
    // Error messages can be returned in an array using `errors.array()`.
    console.error('get_UserProfileLimited validation', errors.array());
    res.json({
      message: 'Käyttäjänimi on jo olemassa',
    });
    next(httpError('Invalid data', 400));
    return;
  }

  passport.authenticate('local', {session: false}, (err, user, info) => {
    console.log('info: ', info);
    console.log('err1: ', err);
    if (err || !user) {
      next(httpError('Virhe kirjautuessa', 403));
      res.json({
        message: 'Virhe kirjautuessa',
      });
      return;
    }
    req.login(user, {session: false}, (err) => {
      if (err) {
        console.log('err2: ', err);
        next(httpError('Virhe kirjautuessa', 403));
        res.json({
          message: 'Virhe kirjautuessa',
        });
        return;
      }
      const token = jwt.sign(user, process.env.JWT_SECRET);
      return res.json({user, token});
    });
  })(req, res, next);
};

module.exports = {
  login,
};