/**
 * Created by Srinivasa Rao A on 06/06/2020
*/
const fs = require('fs');
const path = require('path');
const winston = require('winston');

const config = require('./winston.config');

/**
 * Remove the file, ignoring any errors
 */
try { fs.unlinkSync(filename); } catch (ex) { }

const logger = winston.createLogger({
  levels: config.levels,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.simple()
  ),
  defaultMeta: { service: 'Trello service' },
  transports: [
    new winston.transports.Console({ handleExceptions: true }),
    new winston.transports.File({ filename: path.join(__dirname, 'logs', config.fileName) })
  ],
  level: 'custom'
});

module.exports = logger;
