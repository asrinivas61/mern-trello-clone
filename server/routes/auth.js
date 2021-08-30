const AuthModule = require('../module/auth-module');
const { logger } = require('../loggers');

const _authModule = new AuthModule();

const getAuth = async (req, res, next) => {
  logger.info('Get AUTH: ENTRY');
  let user;
  try {
    user = await _authModule.getAuth(req);
    res.status(200).json(user);
  } catch (error) {
    logger.error('Internal Server Error', error);
    res.status(500).send('Internal Server Error');
  }
};

const postAuth = async (req, res, next) => {
  logger.info('Post AUTH: ENTRY');
  let token;
  try {
    token = await _authModule.postAuth(req);
    res.status(200).json({ token });
  } catch (error) {
    logger.error('Internal Server Error', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getAuth,
  postAuth
};
