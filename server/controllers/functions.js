const Task = require('../models/task.model');

const functions = {

  setNewIndex: async function (colId, cardId, newIndex) {
    const index = await Task.updateOne(
      { colId, "cards._id": cardId },
      { $set: { "cards.$.order": newIndex } }
    )
  },
  changeCardName: async function (colId, cardId, name) {
    const taskChanged = await Task.updateOne(
      { _id: colId, "cards._id": cardId },
      { $set: { "cards.$.name": name } }
    );
  },
  moveDown: async function (colId, cardId, oldIndex, newIndex) {
    const moveInsideDown = await Task.updateMany(
      { colId, "cards._id": cardId },
      { $inc: { "cards.$[ord].order": -1 } },
      {
        arrayFilters: [
          {
            "ord.order": { $gt: oldIndex, $lte: newIndex }
          }
        ]
      }
    );
  },
  moveUp: async function (colId, cardId, oldIndex, newIndex) {
    const moveInsideUp = await Task.updateMany(
      { colId, "cards._id": cardId },
      { $inc: { "cards.$[ord].order": 1 } },
      {
        arrayFilters: [
          {
            "ord.order": { $gte: newIndex, $lt: oldIndex }
          }
        ]
      }
    );
  },
  moveToColumn: async function (colId, targetColId, cardId, card) {
    const taskSaved = await Task.findByIdAndUpdate(targetColId, { $push: { cards: card } });
    const taskDeleted = await Task.findByIdAndUpdate(colId, { $pull: { cards: { _id: cardId } } });
  }
}






module.exports = functions;