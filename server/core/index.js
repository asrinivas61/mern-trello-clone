const passport_init = require('./passport.auth');
const { db_init, dbClose } = require('./db-connect');

module.exports = {
  passportAuth: passport_init,
  dbConnect: db_init,
  dbClose
};
