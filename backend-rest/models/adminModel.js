
const pooladmin = require('../database/db');
const promisePoolAdmin = pooladmin.promise();

 // admindashboard alkaa

const getUsersCountAdmin = async (next) => {
    try {
        const [rows] = await promisePoolAdmin.execute('SELECT COUNT(*) AS count FROM Users');

        return rows[0].count;
    } catch (e) {
        console.error('getUsersCountAdmin', e.message);
        next(httpError('Database error', 500));
    }
};

const getRecipesCount = async (next) => {
    try {
        const [rows] = await promisePoolAdmin.execute('SELECT COUNT(*) AS count FROM Recipes');

        return rows[0].count;
    } catch (e) {
        console.error('getRecipesCount', e.message);
        next(httpError('Database error', 500));
    }
};
const getImagesCount = async (next) => {
    try {
        const [rows] = await promisePoolAdmin.execute('SELECT COUNT(*) AS count FROM Images');

        return rows[0].count;
    } catch (e) {
        console.error('getImagesCount', e.message);
        next(httpError('Database error', 500));
    }
};
const getCommentsCount = async (next) => {
    try {
        const [rows] = await promisePoolAdmin.execute('SELECT COUNT(*) AS count FROM Comments');

        return rows[0].count;
    } catch (e) {
        console.error('getCommentsCount', e.message);
        next(httpError('Database error', 500));
    }
};
const getCommentRatingCount = async (data, next) => {
    try {
        const [rows] = await promisePoolAdmin.execute(`SELECT COUNT(*) AS count FROM CommentRating `);

        return rows[0].count;
    } catch (e) {
        console.error('getCommentRatingCount', e.message);
        next(httpError('Database error', 500));
    }
};
const getReciperatingCount = async (data, next) => {
    try {
        const [rows] = await promisePoolAdmin.execute(`SELECT COUNT(*) AS count FROM RecipeRating `);

        return rows[0].count;
    } catch (e) {
        console.error('getReciperatingCount', e.message);
        next(httpError('Database error', 500));
    }
};
const getRecipefavoriteCount = async (data, next) => {
    try {
        const [rows] = await promisePoolAdmin.execute(`SELECT COUNT(*) AS count FROM RecipeFavorite `);

        return rows[0].count;
    } catch (e) {
        console.error('getRecipefavoriteCount', e.message);
        next(httpError('Database error', 500));
    }
};
const getmealtypesCount = async (next) => {
    try {
        const [rows] = await promisePoolAdmin.execute('SELECT COUNT(*) AS count FROM MealTypes');

        return rows[0].count;
    } catch (e) {
        console.error('getmealtypesCount', e.message);
        next(httpError('Database error', 500));
    }
};
const getcoursesCount = async (next) => {
    try {
        const [rows] = await promisePoolAdmin.execute('SELECT COUNT(*) AS count FROM Courses');

        return rows[0].count;
    } catch (e) {
        console.error('getcoursesCount', e.message);
        next(httpError('Database error', 500));
    }
};


const getRecipiemealtypeCount = async (data, next) => {
    try {
        const [rows] = await promisePoolAdmin.execute(`SELECT COUNT(*) AS count FROM RecipeMealType `);

        return rows[0].count;
    } catch (e) {
        console.error('getRecipiemealtypeCount', e.message);
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

 // admin dashboard loppuu


// admin editointi ja lisäys alkaa
const modifyuseradmin = async (data, next) => {
    try {
        const [rows] = await promisePoolAdmin.execute(`UPDATE Users SET Useremail = ?, Userpassword = ? WHERE Userid = ?;`,
            data);
        return rows;
    } catch (e) {
        console.error('modifyuseradmin', e.message);
        next(httpError('Database error', 500));
    }
}
const adduserAdmin = async (data, next) => {
    try {
        const [rows] = await promisePoolAdmin.execute(`INSERT INTO Users (Useremail, Userpassword)
                                                    VALUES (?, ?);`,
            data);
        return rows;
    } catch (e) {
        console.error('adduserAdmin', e.message);
        next(httpError('Database error', 500));
    }
}
const deleteuserbyidAdmin = async (data, next) => {
    try {
        const [rows] = await promisePoolAdmin.execute(`DELETE FROM Users WHERE Userid = ?;`,
            data);
        return rows;
    } catch (e) {
        console.error('deleteuserAdmin', e.message);
        next(httpError('Database error', 500));
    }
}
// admin editointi ja lisäys loppuu
const getUsersbyidAdmin = async (data, next) => {
    try {
        const [rows] = await promisePoolAdmin.execute(`SELECT *
                                                FROM Users WHERE Userid = ?;`,
            data);
        return rows;
    } catch (e) {
        console.error('getUsersbyidAdmin', e.message);
        next(httpError('Database error', 500));
    }
}
const getRecipesbyUserNameadmin = async (data, next) => {
    try {
        const [rows] = await promisePoolAdmin.execute(`SELECT *
                                                FROM Recipes WHERE Userid = ?;`,
            data);
        return rows;
    } catch (e) {
        console.error('getRecipesbyUserNameadmin', e.message);
        next(httpError('Database error', 500));
    }
}


module.exports = {
    getAllUsersAdmin,
    getUsersCountAdmin,
    getRecipesCount,
    getImagesCount,
    getCommentsCount,
    getCommentRatingCount,
    getReciperatingCount,
    getRecipefavoriteCount,
    getRecipiemealtypeCount,
    modifyuseradmin,
    adduserAdmin,
    deleteuserbyidAdmin,
    getUsersbyidAdmin,
    getRecipesbyUserNameadmin,
    getmealtypesCount,
    getcoursesCount


};
