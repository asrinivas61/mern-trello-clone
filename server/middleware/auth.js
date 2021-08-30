const jwt = require('jsonwebtoken');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { logger } = require('../loggers');

const auth = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');
  const privateKey = fs.readFileSync(path.join(__dirname, '../config', 'certs', 'private_rsa'), 'utf-8');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    jwt.verify(token, privateKey, { algorithms: ['HS256'] }, (err, decoded) => {
      if (err) {
        logger.error('Token expired, user requires to do re-auth');
        next(err);
      }
      req.user = decoded.user;
      next();
    });
  } catch (err) {
    logger.error('Invalid Token in the request');
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;
