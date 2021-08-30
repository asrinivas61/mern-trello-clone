/**
 * Created by Srinivasa Rao A on 29/08/2021
*/
const mongo = {
  host: process.env.MONGO_HOST || 'localhost',
  port: process.env.MONGO_PORT || 27017,
  db: process.env.MONGO_DB || 'trellodb',
  username: process.env.MONGO_DB_USERNAME || 'testuser',
  password: process.env.MONGO_DB_PASSWORD || 'xxxxxxxxxxxxxxxxxxx',
  params: process.env.MONGO_DB_PARAMS || '?ssl=true&appName=@testdb@'
};

const secretKey = 'TrelloServerSecret';
const tokenExpiry = 2 * 60 * 60;
const timeZone = 'Europe/London';
const oneDayInMs = 24 * 60 * 60 * 1000;

module.exports = {
  MONGO: mongo,
  SECRET: secretKey,
  EXPIRY: tokenExpiry,
  TIMEZONE: timeZone,
  ONE_DAY: oneDayInMs
};
