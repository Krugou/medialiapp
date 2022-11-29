const poolRegUser = require('../database/db');
const poolUser = require('../database/db');
const pooladmin = require('../database/db');
const promisePoolAdmin = pooladmin.promise();
const promisePoolRegUser = poolRegUser.promise();
const promisePoolUser = poolUser.promise();


const getUsersCountAdmin = async (next) => {
    try {
        const [rows] = await promisePoolAdmin.execute('SELECT COUNT(*) AS count FROM Users');
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
const addUsersRegUser = async (data, next) => {


    console.log("addUsersRegUser");
    try {
        const [rows] = await promisePoolRegUser.execute(`INSERT INTO Users (Useremail, Userpassword) 
                                                    VALUES (?, ?);`,
                                                        data);
        return rows;
    } catch (e) {
        console.error('addUsersAdmin', e.message);
        next(httpError('Database error', 500));
    }
}
const findUsersByEmailRegUser = async (name, next) => {

    try {
        const [rows] = await promisePoolRegUser.execute(`SELECT *
                                                FROM Users WHERE Useremail = (?);
                                                `,name);
        return rows;
    } catch (e) {
        console.error('findUsersByEmailRegUser', e.message);
        next(httpError('Database error', 500));
    }
}
module.exports = {
    getAllUsersAdmin,
    getUsersCountAdmin,
    addUsersRegUser,
    findUsersByEmailRegUser,

};
