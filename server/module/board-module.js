const BoardSchema = require('../models/Board');
const UserSchema = require('../models/User');

class Board {
  constructor () {
  }

  async createBoard (req) {
    const { title, backgroundURL } = req.body;

    // Create and save the board
    const newBoard = new BoardSchema({ title, backgroundURL });
    const board = await newBoard.save();

    // Add board to user's boards
    const user = await UserSchema.findById(req.user.id);
    user.boards.unshift(board.id);
    await user.save();

    // Add user to board's members as admin
    board.members.push({ user: user.id, name: user.name });

    // Log activity
    board.activity.unshift({
      text: `${user.name} created this board`
    });
    await board.save();

    return board;
  }

  async getUserBoard (req) {
    const user = await UserSchema.findById(req.user.id);

    const boards = [];
    for (const boardId of user.boards) {
      boards.push(await BoardSchema.findById(boardId));
    }

    return boards;
  }

  async getBoardById (req) {
    const board = await BoardSchema.findById(req.params.id);
    if (!board) {
      throw {
        status: 404,
        errors: [{ msg: 'Board not found' }]
      };
    }

    return board;
  }

  async getBoardActivityById (req) {
    const board = await BoardSchema.findById(req.params.boardId);
    if (!board) {
      throw {
        status: 404,
        errors: [{ msg: 'Board not found' }]
      };
    }

    return board.activity;
  }

  async updateBoard (req) {
    const board = await BoardSchema.findById(req.params.id);
    if (!board) {
      throw {
        status: 404,
        errors: [{ msg: 'Board not found' }]
      };
    }

    // Log activity
    if (req.body.title !== board.title) {
      const user = await UserSchema.findById(req.user.id);
      board.activity.unshift({
        text: `${user.name} renamed this board (from '${board.title}')`
      });
    }

    board.title = req.body.title;
    await board.save();

    return board;
  }

  async addMemberToBoard (req) {
    const board = await BoardSchema.findById(req.header('boardId'));
    const user = await UserSchema.findById(req.params.userId);
    if (!user) {
      throw {
        status: 404,
        errors: [{ msg: 'User not found' }]
      };
    }

    // See if already member of board
    if (board.members.map((member) => member.user).includes(req.params.userId)) {
      throw {
        status: 404,
        errors: [{ msg: 'Already member of board' }]
      };
    }

    // Add board to user's boards
    user.boards.unshift(board.id);
    await user.save();

    // Add user to board's members with 'normal' role
    board.members.push({ user: user.id, name: user.name, role: 'normal' });

    // Log activity
    board.activity.unshift({
      text: `${user.name} joined this board`
    });
    await board.save();

    return board.members;
  }
}

module.exports = Board;
