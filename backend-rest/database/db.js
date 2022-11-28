'use strict';
require('dotenv').config();
const mysql = require('mysql2');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'production') {
    var admin = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER_ALL,
        password: process.env.DB_PASS_ALL,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });

    var pooladmin = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER_ALL,
        password: process.env.DB_PASS_ALL,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });
    var poolreguser = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER_CREATEREADUPDATEDELETE,
        password: process.env.DB_PASS_CREATEREADUPDATEDELETE,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10000,
        queueLimit: 0,
    });
    var pooluser = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER_READ,
        password: process.env.DB_PASS_READ,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10000,
        queueLimit: 0,
    });
} else {

    var local = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });
}

module.exports = local, pooladmin, poolreguser, pooluser, admin;