const CheckList = require('../module/checklist-module');
const { validationResult } = require('express-validator');
const { logger } = require('../loggers');

const _checkList = new CheckList();

const addCheckListItem = async (req, res, next) => {
  logger.info('Add checklist: ENTRY');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let card;
  try {
    card = await _checkList.addCheckListItem(req);
    res.status(200).json(card);
  } catch (error) {
    if (err.status === 404) {
      return res.status(404).json(err.errors);
    }
    logger.error('Internal Server Error', error);
    res.status(500).send('Internal Server Error');
  }
};

const updateCheckListItem = async (req, res, next) => {
  logger.info('Update Checklist: ENTRY');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let card;
  try {
    card = await _checkList.updateCheckListItem(req);
    res.status(200).json(card);
  } catch (error) {
    if (err.status === 404) {
      return res.status(404).json(err.errors);
    }
    logger.error('Internal Server Error', error);
    res.status(500).send('Internal Server Error');
  }
};

const updateCheckListItemStatus = async (req, res, next) => {
  logger.info('Update checklist status: ENTRY');
  let lists;
  try {
    lists = await _checkList.updateCheckListItemStatus(req);
    res.status(200).json(lists);
  } catch (err) {
    if (err.status === 404) {
      return res.status(404).json(err.errors);
    }
    logger.error('Internal Server Error', error);
    res.status(500).send('Internal Server Error');
  }
};

const deleteCheckListItem = async (req, res, next) => {
  logger.info('Delete check list: ENTRY');
  let lists;
  try {
    lists = await _checkList.deleteCheckListItem(req);
    res.status(200).json(list);
  } catch (err) {
    if (err.status === 404) {
      return res.status(404).json(err.errors);
    }
    logger.error('Internal Server Error', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  addCheckListItem,
  updateCheckListItem,
  updateCheckListItemStatus,
  deleteCheckListItem
};
