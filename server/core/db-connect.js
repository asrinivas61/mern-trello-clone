/**
 * Created by Srinivasa Rao A on 06/06/2020
*/
const mongoose = require('mongoose');
const config = require('../config');
const { logger } = require('../loggers');

const db_init = function (req, res, next) {
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useUnifiedTopology', true);

  console.log('Connection string', `mongodb://${config.MONGO.username}:${config.MONGO.password}@${config.MONGO.host}:${config.MONGO.port}/${config.MONGO.db}${config.MONGO.params}`);
  // connect to mongodb
  mongoose.connect(`mongodb://${config.MONGO.host}:${config.MONGO.port}/${config.MONGO.db}${config.MONGO.params}`);

  // on Connection on mongodb
  mongoose.connection.on('connected', () => {
    logger.info(`Connected to database mongodb @${config.MONGO.host}:${config.MONGO.port}`);
    console.log(`Connected to database mongodb @${config.MONGO.port}`);
  });

  // on error on mongoDB
  mongoose.connection.on('error', (err) => {
    if (err) {
      logger.error(`Error in connection to database mongodb @${config.MONGO.port}`, err);
      console.log(`Error in connection to database mongodb @${config.MONGO.port}`, err);
    }
  });

  return mongoose.connection;
  // next();
};

const dbClose = () => {
  return mongoose.disconnect();
};

module.exports = {
  db_init,
  dbClose
};
