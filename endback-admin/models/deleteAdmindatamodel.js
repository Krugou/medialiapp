'use strict';

const pooladmin = require('../database/db');
const promisePoolAdmin = pooladmin.promise();

const deleteusers = async (userid) => {
    try {// console log oppenheimer quote
        console.log('i have become death, destroyer of worlds');

        const [rows] = await promisePoolAdmin.execute(
            'DELETE FROM `jakrecipes`.`Users` WHERE Userid = ?;', [userid]);
        return rows;
    } catch (e) {
        console.error('error deleteusers', e.message);
    }
}

const deletecomments = async (commentid) => {
    try { // console log oppenheimer quote
        console.log('i have become death, destroyer of worlds');

        const [rows] = await promisePoolAdmin.execute(
            'DELETE FROM `jakrecipes`.`Comments` WHERE Commentid = ?;', [commentid]);
        return rows;
    } catch (e) {
        console.error('error deletecomments', e.message);
    }
}

const deleterecipes = async (recipeid) => {
    try {// console log oppenheimer quote
        console.log('i have become death, destroyer of worlds');

        const [rows] = await promisePoolAdmin.execute(
            'DELETE FROM `jakrecipes`.`Recipes` WHERE Recipeid = ?;', [recipeid]);
        return rows;
    } catch (e) {
        console.error('error deleterecipes', e.message);
    }
}

module.exports = {
    deletecomments
    , deleterecipes
    , deleteusers
}
