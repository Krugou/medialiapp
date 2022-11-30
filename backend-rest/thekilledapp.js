'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const statusRoute = require('./routes/statusRoute');
const { httpError } = require('./utils/errors');
const path = require('path');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'production') {
    require('./utils/production')(app, process.env.HTTP_PORT || 3000, process.env.HTTPS_PORT || 8000);
} else {
    require('./utils/localhost')(app, process.env.HTTP_PORT || 3000);
};


app.use('/auth', authRoute);

app.use('/users', userRoute);
app.use('/status', statusRoute)
// app.use((req, res, next) => {
//     const err = httpError('Not found', 404);
//     next(err);
// });








