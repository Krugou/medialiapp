'use strict';
require('dotenv').config();
const mysql = require('mysql2');
const pooladmin = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER_ALL,
    password: process.env.DB_PASS_ALL,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
const poolreguser = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER_CREATEREADUPDATEDELETE,
    password: process.env.DB_PASS_CREATEREADUPDATEDELETE,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10000,
    queueLimit: 0,
});
const pooluser = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER_READ,
    password: process.env.DB_PASS_READ,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10000,
    queueLimit: 0,
});
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

    const admin = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER_ALL,
        password: process.env.DB_PASS_ALL,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });
    



    
    



module.exports = admin,  pooladmin, poolreguser, pooluser;