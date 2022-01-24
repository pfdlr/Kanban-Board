const Task = require('../models/task.model');
const mongoose = require('mongoose');
const colors = require('colors');
const { setNewIndex, changeCardName, moveDown, moveUp, moveToColumn } = require('./functions')

// get board
exports.getBoard = async (req, res, next) => {
  try {
    const getBoard = await Task.find().sort({ order: -1 });
    res.status(200).json(getBoard);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* add column */
exports.addColumn = async (req, res, next) => {
  try {
    const name = req.body.name;
    const id = mongoose.Types.ObjectId();
    let newColumn = new Task();
    newColumn.name = name;
    newColumn._id = id
    addColumn = await newColumn.save();
    res.status(200).json(addColumn);
  } catch (err) {
    res.status(500).json(err);
  }
}

/* delete column */
exports.removeColumn = async (req, res, next) => {
  const id = req.params.id;
  try {
    res.status(200).json(await Task.findByIdAndDelete(id));

  } catch (err) {
    res.status(500).json(`Błąd: ${err}`);
  }
}

/* rename column */
exports.renameColumn = async (req, res, next) => {
  try {
    const colId = req.params.id;
    const colNewName = req.body;
    const renameColumn = await Task.findByIdAndUpdate(colId, colNewName)
    res.status(200).json(renameColumn);
  } catch (err) {
    res.status(500).json(`Błąd: ${err}`);
  }
}
/* add card */
exports.addCard = async (req, res, next) => {
  try {
    const colId = req.body._id;
    const card = req.body.cards;
    const order = card.order;
    card._id = mongoose.Types.ObjectId();
    const addCard = await Task.findByIdAndUpdate(colId, { $push: { cards: card } });
    const cardId = card._id;
    res.status(200).json({ cardId: cardId, colId: colId, order: order });
  } catch (err) {
    res.status(500).json(err);
  }
}

/* remove card */
exports.removeCard = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const taskDeleted = await Task.findByIdAndUpdate(body.colId, { $pull: { cards: { _id: id } } });
    res.status(200).json(`Task: ${id} - Deleted`);
  } catch (err) {
    res.status(500).json(`Błąd: ${err}`);
  }
}

/* change card */
exports.modifyCard = async function (req, res, next) {
  try {
    const name = req.body.name;
    const targetColId = req.body.targetColId;
    const colId = req.body.colId;
    const cardId = req.params.id;
    const card = req.body.cards;
    const oldIndex = req.body.oldIndex;
    const newIndex = req.body.newIndex;

    if (!targetColId && name) {
      changeCardName(colId, cardId, name);
      res.status(200).json(`New name: ${name}`);
    } else if (!name && !targetColId && colId && cardId) {
      if (oldIndex < newIndex) {
        moveDown(colId, cardId, oldIndex, newIndex);
        setNewIndex(colId, cardId, newIndex);
        res.status(200).json(`Moved down to index ${newIndex}`);
      }
      else if (oldIndex > newIndex) {
        moveUp(colId, cardId, oldIndex, newIndex);
        setNewIndex(colId, cardId, newIndex);
        res.status(200).json(`Moved up to index ${newIndex}`);
      }

    } else if (!name && colId && targetColId && cardId) {
      moveToColumn(colId, targetColId, cardId, card);
      res.status(200).json(`Moved to column ${targetColId}`);
    } else {
      console.log("BŁĄD".red);
    }
  }
  catch (err) {
    res.status(500).json(`Błąd: ${err}`)
  }
}