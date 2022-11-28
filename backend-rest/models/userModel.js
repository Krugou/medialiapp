const poolRegUser = require('../database/db');
const poolUser = require('../database/db');
const pooladmin = require('../database/db');
const promisePoolAdmin = pooladmin.promise();
const promisePoolRegUser = poolRegUser.promise();
const promisePoolUser = poolUser.promise();


const getUsersCountAdmin = async (next) => {
    try {
        const [rows] = await promisePoolAdmin.execute(process.env.ADMIN_USERS_COUNT);
        console.log('count ', rows[0].count);
        return rows[0].count;
    } catch (e) {
        console.error('getUsersCountAdmin', e.message);
        next(httpError('Database error', 500));
    }
};

const getAllUsersAdmin = async (next) => {
    try {
        const [rows] = await promisePoolAdmin.execute(`SELECT *
                                                FROM Users;
                                                `);
        return rows;
    } catch (e) {
        console.error('getAllUsersAdmin', e.message);
        next(httpError('Database error', 500));
    }
};
module.exports = {
    getAllUsersAdmin,
    getUsersCountAdmin,

};
