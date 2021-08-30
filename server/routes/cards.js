const CardModule = require('../module/card-module');
const { validationResult } = require('express-validator');
const { logger } = require('../loggers');

const _cardModule = new CardModule();

const addCard = async (req, res, next) => {
  logger.info('Add Card: ENTRY');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let card;
  try {
    card = await _cardModule.addCard(req);
    res.status(200).json({ cardId: card.id, listId: req.body.listId });
  } catch (err) {
    if (err.status === 404) {
      return res.status(404).json(err.errors);
    }
    logger.error('Internal Server Error', err);
    res.status(500).send('Internal Server Error');
  }
};

const getAllCards = async (req, res, next) => {
  logger.info('Get All Cards: ENTRY');
  let cards;
  try {
    cards = await _cardModule.getAllCards(req);
    res.status(200).json(cards);
  } catch (err) {
    if (err.status === 404) {
      return res.status(404).json(err.errors);
    }
    logger.error('Internal Server Error', err);
    res.status(500).send('Internal Server Error');
  }
};

const getCardById = async (req, res, next) => {
  logger.info('Get Card by ID: ENTRY');
  let card;
  try {
    card = await _cardModule.getCardById(req);
    res.status(200).json(card);
  } catch (err) {
    if (err.status === 404) {
      return res.status(404).json(err.errors);
    }
    logger.error('Internal Server Error', err);
    res.status(500).send('Internal Server Error');
  }
};

const updateCardById = async (req, res, next) => {
  logger.info('Update Card By ID: ENTRY');
  const { title } = req.body;
  if (title === '') {
    return res.status(400).json({ msg: 'Title is required' });
  }
  let card;
  try {
    card = await _cardModule.updateCardById(req);
    res.status(200).json(card);
  } catch (err) {
    if (err.status === 404) {
      return res.status(404).json(err.errors);
    }
    logger.error('Internal Server Error', err);
    res.status(500).send('Internal Server Error');
  }
};

const archiveCardById = async (req, res, next) => {
  logger.info('Archive CardBy ID: ENTRY');
  let card;
  try {
    card = await _cardModule.archiveCardById(req);
    res.status(200).json(card);
  } catch (err) {
    if (err.status === 404) {
      return res.status(404).json(err.errors);
    }
    logger.error('Internal Server Error', err);
    res.status(500).send('Internal Server Error');
  }
};

const moveCardById = async (req, res, next) => {
  logger.info('Move Card: ENTRY');
  try {
    const { cardId, from, to } = await _cardModule.moveCardById(req);
    res.status(200).json({ cardId, from, to });
  } catch (err) {
    if (err.status === 404) {
      return res.status(404).json(err.errors);
    }
    logger.error('Internal Server Error', err);
    res.status(500).send('Internal Server Error');
  }
};

const manageMember = async (req, res, next) => {
  logger.info('Add/Delete member: ENTRY');
  let card;
  try {
    card = await _cardModule.manageMember(req);
    res.status(200).json(card);
  } catch (err) {
    if (err.status === 404) {
      return res.status(404).json(err.errors);
    }
    logger.error('Internal Server Error', err);
    res.status(500).send('Internal Server Error');
  }
};

const deleteCardById = async (req, res, next) => {
  logger.info('Delete card: ENTRY');
  let cardId;
  try {
    cardId = await _cardModule.deleteCardById(req);
    res.status(200).json(cardId);
  } catch (err) {
    if (err.status === 404) {
      return res.status(404).json(err.errors);
    }
    logger.error('Internal Server Error', err);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  addCard,
  getAllCards,
  getCardById,
  updateCardById,
  archiveCardById,
  moveCardById,
  manageMember,
  deleteCardById
};
