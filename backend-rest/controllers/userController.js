'use strict';
const { addUsersRegUser, findUsersByEmailRegUser, findUsersByUsernameRegUser} = require('../models/regUserModel');
const { validationResult } = require('express-validator');
const { httpError } = require('../utils/errors');

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


        const data = [
            req.body.email,
            req.body.password,
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
    }

    catch (e) {
        console.error('user_post', e.message);
        next(httpError('Internal server error', 500));
    }
};


module.exports = {
    user_post,
};