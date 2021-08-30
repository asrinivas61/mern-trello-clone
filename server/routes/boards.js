const BoardModule = require('../module/board-module');
const { validationResult } = require('express-validator');
const { logger } = require('../loggers');

const _boardModule = new BoardModule();

const createBoard = async (req, res, next) => {
  logger.info('create board: ENTRY');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let board;
  try {
    board = await _boardModule.createBoard(req);
    res.status(200).json(board);
  } catch (error) {
    logger.error('Internal Server Error', error);
    res.status(500).send('Internal Server Error');
  }
};

const getUserBoard = async (req, res, next) => {
  logger.info('Get UserBoard: ENTRY');
  let boards;
  try {
    boards = await _boardModule.getUserBoard(req);
    res.status(200).json(boards);
  } catch (error) {
    logger.error('Internal Server Error', error);
    res.status(500).send('Internal Server Error');
  }
};

const getBoardById = async (req, res, next) => {
  logger.info('Get BoardbyId: ENTRY');
  let board;
  try {
    board = await _boardModule.getBoardById(req);
    res.status(200).json(board);
  } catch (err) {
    if (err.status === 404) {
      return res.status(404).json(err.errors);
    }
    logger.error('Internal Server Error', error);
    res.status(500).send('Internal Server Error');
  }
};

const getBoardActivityById = async (req, res, next) => {
  logger.info('Get Board Activity: ENTRY');
  const { title } = req.body;
  if (title === '') {
    return res.status(400).json({ msg: 'Title is required' });
  }
  let board;
  try {
    board = await _boardModule.getBoardActivityById(req);
    res.status(200).json(board);
  } catch (err) {
    if (err.status === 404) {
      return res.status(404).json(err.errors);
    }
    logger.error('Internal Server Error', error);
    res.status(500).send('Internal Server Error');
  }
};

const updateBoard = async (req, res, next) => {
  logger.info('Get Update board: ENTRY');
  let board;
  try {
    board = await _boardModule.updateBoard(req);
    res.status(200).json(board);
  } catch (err) {
    if (err.status === 404) {
      return res.status(404).json(err.errors);
    }
    logger.error('Internal Server Error', error);
    res.status(500).send('Internal Server Error');
  }
};

const addMemberToBoard = async (req, res, next) => {
  logger.info('Add memeber to board: ENTRY');
  let members;
  try {
    members = await _boardModule.addMemberToBoard(req);
    res.status(200).json(members);
  } catch (err) {
    if (err.status === 404) {
      return res.status(404).json(err.errors);
    }
    logger.error('Internal Server Error', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  createBoard,
  getUserBoard,
  getBoardById,
  getBoardActivityById,
  updateBoard,
  addMemberToBoard
};
