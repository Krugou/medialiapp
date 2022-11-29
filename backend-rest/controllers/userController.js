'use strict';
const { getAllUsersAdmin, getUsersCountAdmin, addUsersRegUser, findUsersByEmailRegUser} = require('../models/userModel');
const {validationResult} = require('express-validator');
const { httpError } = require('../utils/errors');

const user_post = async (req, res, next) => {

    try {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors.
            // Error messages can be returned in an array using `errors.array()`.
            console.error('user_post validation', errors.array());
            next(httpError('Invalid data', 400));
            res.json({
                message: 'Check email and password again',
            });
            return;
        }


        const data = [
            req.body.email,
            req.body.password,
        ];

        const resultFind = await findUsersByEmailRegUser(data[0]);
        console.log(resultFind);


        if (resultFind.length > 0) {
            next(httpError('Email is already in use', 400));
            res.json({
                message: 'Email is already in use',
            });
            return;
        }

        const result = await addUsersRegUser(data, next);
        if (result.affectedRows < 1) {
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

const user_list_admin_get = async (req, res, next) => {
    try {
        const users = await getAllUsersAdmin(next);
        if (users.length < 1) {
            next(httpError('No users found', 404));
            return;
        }
        res.json(users);
    } catch (e) {
        console.error('user_list_get', e.message);
        next(httpError('Internal server error', 500));
    }
}
const user_count_admin_get = async (req, res, next) => {
    try {
        const count = await getUsersCountAdmin(next);
        if (count < 1) {
            next(httpError('No counts found', 404));
            return;
        }
        res.json(count);
    } catch (e) {
        console.error('user_count_get', e.message);
        next(httpError('Internal server error', 500));
    }
}
module.exports = {
     user_post,
};