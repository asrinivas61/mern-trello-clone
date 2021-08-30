const Board = require('../models/Board');
const { logger } = require('../loggers');

const member = async (req, res, next) => {
  const board = await Board.findById(req.header('boardId'));
  if (!board) {
    logger.error('Board not found');
    return res.status(404).json({ msg: 'Board not found' });
  }

  const members = board.members.map((member) => member.user);
  if (members.includes(req.user.id)) {
    next();
  } else {
    logger.error(`User: ${req.user.id} is not a member of this board to make changes`);
    res.status(401).json({ msg: 'You must be a member of this board to make changes' });
  }
};

module.exports = member;
