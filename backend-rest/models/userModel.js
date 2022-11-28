const { poolAdmin,poolRegUser,poolUser } = require('../database/db');
const promisePoolAdmin = poolAdmin.promise();
// const promisePoolRegUser = poolRegUser.promise();
// const promisePoolUser  = poolUser.promise();




const getUsersCountAdmin = async (next) => {
    try {
        const [rows] = await promisePoolAdmin.execute('SELECT COUNT(*) AS count FROM users');
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
                                                FROM users;
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
