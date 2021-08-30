const CardSchema = require('../models/Card');
const ListSchema = require('../models/List');
const UserSchema = require('../models/User');
const BoardSchema = require('../models/Board');

class Card {
  constructor () {
  }

  async addCard (req) {
    const { title, listId } = req.body;
    const boardId = req.header('boardId');

    // Create and save the card
    const newCard = new CardSchema({ title });
    const card = await newCard.save();

    // Assign the card to the list
    const list = await ListSchema.findById(listId);
    list.cards.push(card.id);
    await list.save();

    // Log activity
    const user = await UserSchema.findById(req.user.id);
    const board = await BoardSchema.findById(boardId);
    board.activity.unshift({
      text: `${user.name} added '${title}' to '${list.title}'`
    });
    await board.save();

    return { cardId: card.id, listId };
  }

  async getAllCards (req) {
    const list = await ListSchema.findById(req.params.listId);
    if (!list) {
      throw {
        status: 404,
        errors: [{ msg: 'List not found' }]
      };
    }

    const cards = [];
    for (const cardId of list.cards) {
      cards.push(await ListSchema.findById(cardId));
    }

    return cards;
  }

  async getCardById (req) {
    const card = await CardSchema.findById(req.params.id);
    if (!card) {
      throw {
        status: 404,
        errors: [{ msg: 'Card not found' }]
      };
    }

    return card;
  }

  async updateCardById (req) {
    const { title, description, label } = req.body;

    const card = await CardSchema.findById(req.params.id);
    if (!card) {
      throw {
        status: 404,
        errors: [{ msg: 'Card not found' }]
      };
    }

    card.title = title || card.title;
    if (description || description === '') {
      card.description = description;
    }
    if (label || label === 'none') {
      card.label = label;
    }
    await card.save();

    return card;
  }

  async archiveCardById (req) {
    const card = await CardSchema.findById(req.params.id);
    if (!card) {
      throw {
        status: 404,
        errors: [{ msg: 'Card not found' }]
      };
    }

    card.archived = req.params.archive === 'true';
    await card.save();

    // Log activity
    const user = await UserSchema.findById(req.user.id);
    const board = await BoardSchema.findById(req.header('boardId'));
    board.activity.unshift({
      text: card.archived
        ? `${user.name} archived card '${card.title}'`
        : `${user.name} sent card '${card.title}' to the board`
    });
    await board.save();

    return card;
  }

  async moveCardById (req) {
    const { fromId, toId, toIndex } = req.body;
    const boardId = req.header('boardId');

    const cardId = req.params.id;
    const from = await ListSchema.findById(fromId);
    let to = await ListSchema.findById(toId);
    if (!cardId || !from || !to) {
      throw {
        status: 404,
        errors: [{ msg: 'List/card not found' }]
      };
    } else if (fromId === toId) {
      to = from;
    }

    const fromIndex = from.cards.indexOf(cardId);
    if (fromIndex !== -1) {
      from.cards.splice(fromIndex, 1);
      await from.save();
    }

    if (!to.cards.includes(cardId)) {
      if (toIndex === 0 || toIndex) {
        to.cards.splice(toIndex, 0, cardId);
      } else {
        to.cards.push(cardId);
      }
      await to.save();
    }

    // Log activity
    if (fromId !== toId) {
      const user = await UserSchema.findById(req.user.id);
      const board = await BoardSchema.findById(boardId);
      const card = await CardSchema.findById(cardId);
      board.activity.unshift({
        text: `${user.name} moved '${card.title}' from '${from.title}' to '${to.title}'`
      });
      await board.save();
    }

    return ({ cardId, from, to });
  }

  async manageMember (req) {
    const { cardId, userId } = req.params;
    const card = await CardSchema.findById(cardId);
    const user = await UserSchema.findById(userId);
    if (!card || !user) {
      throw {
        status: 404,
        errors: [{ msg: 'Card/user not found' }]
      };
    }

    const add = req.params.add === 'true';
    const members = card.members.map((member) => member.user);
    const index = members.indexOf(userId);
    if ((add && members.includes(userId)) || (!add && index === -1)) {
      return card;
    }

    if (add) {
      card.members.push({ user: user.id, name: user.name });
    } else {
      card.members.splice(index, 1);
    }
    await card.save();

    // Log activity
    const board = await BoardSchema.findById(req.header('boardId'));
    board.activity.unshift({
      text: `${user.name} ${add ? 'joined' : 'left'} '${card.title}'`
    });
    await board.save();

    return card;
  }

  async deleteCardById (req) {
    const card = await CardSchema.findById(req.params.id);
    const list = await ListSchema.findById(req.params.listId);
    if (!card || !list) {
      throw {
        status: 404,
        errors: [{ msg: 'List/card not found' }]
      };
    }

    list.cards.splice(list.cards.indexOf(req.params.id), 1);
    await list.save();
    await card.remove();

    // Log activity
    const user = await UserSchema.findById(req.user.id);
    const board = await BoardSchema.findById(req.header('boardId'));
    board.activity.unshift({
      text: `${user.name} deleted '${card.title}' from '${list.title}'`
    });
    await board.save();

    return req.params.id;
  }
}

module.exports = Card;
