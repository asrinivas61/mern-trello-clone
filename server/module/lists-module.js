const ListSchema = require('../models/List');
const BoardSchema = require('../models/Board');
const UserSchema = require('../models/User');

class List {
  constructor () {
  }

  async createList (req) {
    const title = req.body.title;
    const boardId = req.header('boardId');

    const newList = new ListSchema({ title });
    const list = await newList.save();

    const board = await BoardSchema.findById(boardId);
    board.lists.push(list.id);

    const user = await UserSchema.findById(req.user.id);
    board.activity.unshift({
      text: `${user.name} added '${title}' to this board`
    });
    await board.save();

    return list;
  }

  async getBoardAllLists (req) {
    const board = await BoardSchema.findById(req.params.boardId);
    if (!board) {
      throw {
        status: 404,
        errors: [{ msg: 'Board not found' }]
      };
    }

    const lists = [];
    for (const listId of board.lists) {
      lists.push(await ListSchema.findById(listId));
    }
    return lists;
  }

  async getListById (req) {
    const list = await ListSchema.findById(req.params.id);
    if (!list) {
      throw {
        status: 404,
        errors: [{ msg: 'List not found' }]
      };
    }
    return list;
  }

  async updateListById (req) {
    const list = await ListSchema.findById(req.params.id);
    if (!list) {
      throw {
        status: 404,
        errors: [{ msg: 'List not found' }]
      };
    }

    list.title = req.body.title;
    await list.save();

    return list;
  }

  async archiveList (req) {
    const list = await ListSchema.findById(req.params.id);
    if (!list) {
      throw {
        status: 404,
        errors: [{ msg: 'List not found' }]
      };
    }

    list.archived = req.params.archive === 'true';
    await list.save();

    // Log activity
    const user = await UserSchema.findById(req.user.id);
    const board = await BoardSchema.findById(req.header('boardId'));
    board.activity.unshift({
      text: list.archived
        ? `${user.name} archived list '${list.title}'`
        : `${user.name} sent list '${list.title}' to the board`
    });
    await board.save();

    return list;
  }

  async moveList (req) {
    const toIndex = req.body.toIndex ? req.body.toIndex : 0;
    const boardId = req.header('boardId');
    const board = await BoardSchema.findById(boardId);
    const listId = req.params.id;
    if (!listId) {
      throw {
        status: 404,
        errors: [{ msg: 'List not found' }]
      };
    }

    board.lists.splice(board.lists.indexOf(listId), 1);
    board.lists.splice(toIndex, 0, listId);
    await board.save();

    return board.lists;
  }
}

module.exports = List;
