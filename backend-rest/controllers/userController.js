'use strict';
const { getAllUsersAdmin, getUsersCountAdmin, addUsersRegUser} = require('../models/userModel');
const { httpError } = require('../utils/errors');

const user_post = async (req, res, next) => {

    try {
        const data = [
            req.body.email,
            req.body.password,
        ];

        const result = await addUsersRegUser(data, next);
        if (result.affectedRows < 1) {
            next(httpError('Invalid data', 400));
        }
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
    user_list_admin_get,
    user_count_admin_get, user_post,
};