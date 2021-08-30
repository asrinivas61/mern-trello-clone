const CardSchema = require('../models/Card');

class CheckList {
  constructor () {
  }

  async addCheckListItem (req) {
    const card = await CardSchema.findById(req.params.cardId);
    if (!card) {
      throw {
        status: 404,
        errors: [{ msg: 'Card not found' }]
      };
    }

    card.checklist.push({ text: req.body.text, complete: false });
    await card.save();

    return card;
  }

  async updateCheckListItem (req) {
    const card = await CardSchema.findById(req.params.cardId);
    if (!card) {
      throw {
        status: 404,
        errors: [{ msg: 'Card not found' }]
      };
    }

    card.checklist.find((item) => item.id === req.params.itemId).text = req.body.text;
    await card.save();

    return card;
  }

  async updateCheckListItemStatus (req) {
    const card = await CardSchema.findById(req.params.cardId);
    if (!card) {
      throw {
        status: 404,
        errors: [{ msg: 'Card not found' }]
      };
    }

    card.checklist.find((item) => item.id === req.params.itemId).complete =
        req.params.complete === 'true';
    await card.save();

    return card;
  }

  async deleteCheckListItem (req) {
    const card = await CardSchema.findById(req.params.cardId);
    if (!card) {
      throw {
        status: 404,
        errors: [{ msg: 'Card not found' }]
      };
    }

    const index = card.checklist.findIndex((item) => item.id === req.params.itemId);
    if (index !== -1) {
      card.checklist.splice(index, 1);
      await card.save();
    }

    return card;
  }
}

module.exports = CheckList;
