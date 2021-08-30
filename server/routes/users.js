const UserModule = require('../module/user-module');
const { validationResult } = require('express-validator');
const { logger } = require('../loggers');

const _userModule = new UserModule();

const createUser = async (req, res, next) => {
  logger.info('Create user: ENTRY');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let token;
  try {
    token = await _userModule.createUser(req);
    res.status(201).send({ token });
  } catch (error) {
    logger.error('Internal Server Error', error);
    res.status(error.status).json({ errors: error.errors });
  }
};

const fetchUsers = function (req, res, next) {
  logger.info('Get Users: ENTRY');
  try {
    _userModule.fetchUsers(req)
      .then(usrInfo => {
        res.status(200).json(usrInfo);
      });
  } catch (error) {
    logger.error('Internal Server Error', error);
    res.status(500).json('something went wrong..');
  }
};

module.exports = {
  fetchUsers,
  createUser
};
