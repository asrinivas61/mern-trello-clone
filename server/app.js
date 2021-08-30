const createError = require('http-errors');
const path = require('path');
const passport = require('passport');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const routes = require('./routes');
const responseHandler = require('./middleware/response-handler');
const { passportAuth, dbConnect } = require('./core');
const config = require('./config');
const { logger } = require('./loggers');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// set application secret token;
app.set('superSecret', `${config.JWT_SECRET}`);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public', 'trello-client-portal')));

// app.use(responseHandler);

// add cors
app.use(cors());

// Passpost Auth initiation
app.use(passport.initialize());
// passportAuth();

// Database connectivity Initiation
dbConnect();

// add routes
app.use('/api', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  res.status(404);
  res.json(0, 'Requested page not found 404', next);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log('ON ERROR', err);
  res.status(500);
  res.json(-1, `Error on Server ${err}`, next);
});

logger.info('Server started successfully.');

module.exports = app;
