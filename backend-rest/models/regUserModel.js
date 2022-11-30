const poolRegUser = require('../database/db');
const promisePoolRegUser = poolRegUser.promise();


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
                                                FROM Users WHERE Useremail = "${name}";
                                                `);
        return rows;
    } catch (e) {
        console.error('findUsersByEmailRegUser', e.message);
        next(httpError('Database error', 500));
    }
}
const getUserLogin = async (params, next) => {
    try {
        console.log(params);
        const [rows] = await promisePoolRegUser.execute(
            'SELECT * FROM Users WHERE email = ?;',
            params);
        return rows;
    } catch (e) {
        console.error('getUserLogin', e.message);
        next(httpError('Database error', 500));
    }
};

module.exports = {
    
    addUsersRegUser,
    findUsersByEmailRegUser,
    getUserLogin,

};
