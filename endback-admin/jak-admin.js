'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const {httpError} = require('../backend-rest/utils/errors');
const passport = require('../backend-rest/utils/pass');

app.use(cors());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'production') {
  require('./utils/production')(app, process.env.HTTP_PORT || 3001,
      process.env.HTTPS_PORT || 8001);
} else {
  require('./utils/localhost')(app, process.env.HTTP_PORT || 3001);
}

app.get('/', function(req, res) { res.send('hello world'); });
app.use('/front', require('./routes/frontRoute'));
app.use('/auth', require('./routes/authRoute'));

app.use('/status', require('./routes/statusRoute'));
app.use('/a', require('./routes/getAdminRoute'));

// app.use((req, res, next) => {
//     const err = httpError('Not found', 404);
//     next(err);
// });








