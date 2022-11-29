const poolUser = require('../database/db');
const promisePoolUser = poolUser.promise();

const fetchAllRecipes = async (next) => {
    try {
        const [rows] = await promisePoolUser.execute(`SELECT *
                                                FROM Recipes;
                                                `);
        return rows;
    } catch (e) {
        console.error('fetchAllRecipes', e.message);
        next(httpError('Database error', 500));
    }
};


module.exports = {
   
    fetchAllRecipes

};
