'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const frontRoute = require('./routes/frontRoute');
const statusRoute = require('./routes/statusRoute');
const recipesRoute = require('./routes/recipesRoute');
const recipeslimitedRoute = require('./routes/recipeslimitedRoute');
const userlimitedRoute = require('./routes/userslimitedRoute');

const {httpError} = require('./utils/errors');
const passport = require('./utils/pass');
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended: true}));

app.use(passport.initialize());

// express avaa kansiot public, views,uploads , thumbnails
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use('/thumbnails', express.static('thumbnails'));

// valitse ympäristö
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'production') {
  require('./utils/production')(app, process.env.HTTP_PORT || 3000,
      process.env.HTTPS_PORT || 8000);
} else {
  require('./utils/localhost')(app, process.env.HTTP_PORT || 3000);
}

// käytettävät polut
app.use('/front', frontRoute);
app.use('/auth', authRoute);
app.use('/recipes', passport.authenticate('jwt', {session: false}), recipesRoute)

app.use('/recipeslimited', recipeslimitedRoute);
app.use('/userslimited', userlimitedRoute);
app.use('/users', passport.authenticate('jwt', {session: false}), userRoute);
app.use('/status', statusRoute);

// app.use((req, res, next) => {
//     const err = httpError('Not found', 404);
//     next(err);
// });








