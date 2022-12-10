'use strict';

const pooladmin = require('../database/db');
const promisePoolAdmin = pooladmin.promise();

const getCounts = async () => {
    try {
        const [allthecounts] = await promisePoolAdmin.execute('SELECT * FROM `jakrecipes`.`allthecounts`;');
        return allthecounts;
    } catch (e) {
        console.error('error getAdminCounts', e.message);
    }
};
const getUptime = async () => {
    try {
        const [uptime] = await promisePoolAdmin.execute('show status LIKE "uptime%";');
        return uptime;
    } catch (e) {
        console.error('error getUptime', e.message);
    }
};
const getAllusers = async () => {
    try {
        const [allusers] = await promisePoolAdmin.execute('SELECT distinct * FROM `jakrecipes`.`Users` ;');
        return allusers;
    } catch (e) {
        console.error('error getAllusers', e.message);
    }
};
const getAllrecipeData = async () => {
    try {
        const [allrecipes] = await promisePoolAdmin.execute('SELECT distinct * FROM `jakrecipes`.`Recipes` INNER JOIN Recipemealtype   INNER JOIN Mealtypes  INNER JOIN Courses ON Recipes.Recipecourse = Courses.Courseid   INNER JOIN Images ON  Recipes.Recipeid = Images.ImageRecipe ;');
        return allrecipes;
    } catch (e) {
        console.error('error getAllrecipes', e.message);
    }
};
const getAllcommentswithauthors = async () => {
    try {
        const [allcomments] = await promisePoolAdmin.execute('SELECT distinct * FROM `jakrecipes`.`Comments` inner join users on Comments.Commentuserid = Users.Userid  ;');
        return allcomments;
    } catch (e) {
        console.error('error getAllcomments', e.message);
    }
};

module.exports = {

    getCounts,
    getUptime,
    getAllusers,
    getAllrecipeData,
    getAllcommentswithauthors,



};
