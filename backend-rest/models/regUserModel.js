const poolRegUser = require('../database/db');
const promisePoolRegUser = poolRegUser.promise();
const getReguserOwnedRecipes = async (userid,next) => {
  try {
    const [rows] = await promisePoolRegUser.execute(`SELECT * FROM reguserprofileview where Userid = 32 group by Recipeid order by Recipeid desc`);
    // "${userid}"
    return rows;
  } catch (e) {
    next(httpError('Database error', 500));
  }
};
    
const addUsersRegUser = async (data, next) => {

  console.log('addUsersRegUser');
  try {
    const [rows] = await promisePoolRegUser.execute(`INSERT INTO Users (Useremail, Userpassword, Username) 
                                                    VALUES (?, ?, ?);`,
        data);
    return rows;
  } catch (e) {
    console.error('addUsersAdmin', e.message);
    next(httpError('Database error', 500));
  }
};
const findUsersByEmailRegUser = async (email, next) => {

  try {
    const [rows] = await promisePoolRegUser.execute(`SELECT *
                                                FROM Users WHERE Useremail = "${email}"; 
                                                `); //VOI LISÄTÄ INDEXIN.
    return rows;
  } catch (e) {
    console.error('findUsersByEmailRegUser', e.message);
    next(httpError('Database error', 500));
  }
};
const findUsersByUsernameRegUser = async (name, next) => {

  try {
    const [rows] = await promisePoolRegUser.execute(`SELECT *
                                                FROM Users WHERE Username = "${name}";
                                                `); //VOI LISÄTÄ INDEXIN.
    return rows;
  } catch (e) {
    console.error('findUsersByUsernameRegUser', e.message);
    next(httpError('Database error', 500));
  }
};
const findUsersByUseridRegUser = async (id, next) => {

  try {
    const [rows] = await promisePoolRegUser.execute(`SELECT *
                                                FROM Users WHERE Userid = "${id}";
                                                `); //VOI LISÄTÄ INDEXIN.
    return rows;
  } catch (e) {
    console.error('findUsersByUsernameRegUser', e.message);
    next(httpError('Database error', 500));
  }
};

module.exports = {

  addUsersRegUser,
  findUsersByEmailRegUser,
  findUsersByUsernameRegUser,
  findUsersByUseridRegUser,
  getReguserOwnedRecipes,
};
