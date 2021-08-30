const ListModule = require('../module/lists-module');
const { validationResult } = require('express-validator');
const { logger } = require('../loggers');

const _listModule = new ListModule();

const createList = async (req, res, next) => {
  logger.info('CreateList: ENTRY');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let list;
  try {
    list = await _listModule.createList(req);
    res.status(200).json(list);
  } catch (error) {
    logger.error('Internal Server Error', error);
    res.status(500).send('Internal Server Error');
  }
};

const getBoardAllLists = async (req, res, next) => {
  logger.info('Get BoardList: ENTRY');
  let lists;
  try {
    lists = await _listModule.getBoardAllLists(req);
    res.status(200).json(list);
  } catch (err) {
    if (err.status === 404) {
      return res.status(404).json(err.errors);
    }
    logger.error('Internal Server Error', err);
    res.status(500).send('Internal Server Error');
  }
};

const getListById = async (req, res, next) => {
  logger.info('Get List By ID: ENTRY');
  let list;
  try {
    list = await _listModule.getListById(req);
    res.status(200).json(list);
  } catch (err) {
    if (err.status === 404) {
      return res.status(404).json(err.errors);
    }
    logger.error('Internal Server Error', err);
    res.status(500).send('Internal Server Error');
  }
};

const updateListById = async (req, res, next) => {
  logger.info('Update list by ID : ENTRY');
  let list;
  try {
    list = await _listModule.updateListById(req);
    res.status(200).json(list);
  } catch (err) {
    if (err.status === 404) {
      return res.status(404).json(err.errors);
    }
    logger.error('Internal Server Error', err);
    res.status(500).send('Internal Server Error');
  }
};

const archiveList = async (req, res, next) => {
  logger.info('Get Archive list: ENTRY');
  let list;
  try {
    list = await _listModule.archiveList(req);
    res.status(200).json(list);
  } catch (err) {
    if (err.status === 404) {
      return res.status(404).json(err.errors);
    }
    logger.error('Internal Server Error', err);
    res.status(500).send('Internal Server Error');
  }
};

const moveList = async (req, res, next) => {
  logger.info('Move list: ENTRY');
  let list;
  try {
    list = await _listModule.moveList(req);
    res.status(200).json(list);
  } catch (err) {
    if (err.status === 404) {
      return res.status(404).json(err.errors);
    }
    logger.error('Internal Server Error', err);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  createList,
  getBoardAllLists,
  getListById,
  updateListById,
  archiveList,
  moveList
};
