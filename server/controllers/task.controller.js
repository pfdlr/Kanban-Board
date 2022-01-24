const Task = require('../models/task.model');
const mongoose = require('mongoose');
const colors = require('colors');
const { setNewIndex, changeCardName, moveDown, moveUp, moveToColumn } = require('./functions')

// get board
exports.getBoard = async (req, res, next) => {
  console.log("______\n" + "Board set ".green);
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
    console.log("______\n" + "Column Add ".green);
  } catch (err) {
    res.status(500).json(err);
  }
}
/* delete column */
exports.removeColumn = async (req, res, next) => {
  const id = req.params.id;
  try {
    res.status(200).json(await Task.findByIdAndDelete(id));
    console.log("______\n" + "Column removed ".red);
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
    console.log("______\n" + "Column changed ".yellow);
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
    console.log(JSON.stringify(card));
    const addCard = await Task.findByIdAndUpdate(colId, { $push: { cards: card } });
    const cardId = card._id;
    console.log(cardId);
    res.status(200).json({ cardId: cardId, colId: colId, order: order });
    //res.status(200).json(addCard);
    console.log("______\n" + "Card Add ".green);
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
    console.log("______\n" + "DELETED card Id: ".red + JSON.stringify(id).green);
  } catch (err) {
    res.status(500).json(`Błąd: ${err}`);
  }
}
/* change card */
exports.modifyCard = async function (req, res, next) {
  try {
    const updates = req.body;
    const name = req.body.name;
    const targetColId = req.body.targetColId;
    const colId = req.body.colId;
    const cardId = req.params.id;
    const oldIndex = req.body.oldIndex;
    const newIndex = req.body.newIndex;
    console.log("______\n BODY: " + JSON.stringify(updates).green);
    console.log(`|name| Nowa nazwa karty: ${name}`.magenta)
    console.log(`|cardId| ID karty: ${cardId}`.magenta)
    console.log(`|colId| ID kolumny: ${colId}`.magenta);
    console.log(`|targetColId| Target col id: ${targetColId}`.magenta);
    //############################################################################
    //Change card name
    //############################################################################

    if (!targetColId && name) {
      console.log(`..... \n BODY IF I: ${JSON.stringify(updates)}`);
      changeCardName(colId, cardId, name);
      /* const taskChanged = await Task.updateOne(
        { _id: colId, "cards._id": cardId },
        { $set: { "cards.$.name": updates.name } }
      ); */
      console.log("I if - zmiana nazwy \n _____");
      res.status(200).json(`New name: ${updates.name}`);

      //end of change card name
      //############################################################################
      // move inside the column
      //############################################################################

    } else if (!name && !targetColId && colId && cardId) {
      console.log("II if move inside the column \n _____".brightCyan);
      /* move down */
      if (oldIndex < newIndex) {
        moveDown(colId, cardId, oldIndex, newIndex);
        /* const moveInsideDown = await Task.updateMany(
          { colId, "cards._id": cardId },
          { $inc: { "cards.$[ord].order": -1 } },
          {
            arrayFilters: [
              {
                "ord.order": { $gt: oldIndex, $lte: newIndex }
              }
            ]
          }
        ); */
       /*  const setNewIndex = await Task.updateOne(
          { colId, "cards._id": cardId },
          { $set: { "cards.$.order": newIndex } }
        ) */
        setNewIndex(colId, cardId, newIndex);
        console.log("Moved down");
        res.status(200).json(`Moved down to index ${newIndex}`);
      }
      /* move up */
      else if (oldIndex > newIndex) {
        moveUp(colId, cardId, oldIndex, newIndex);
        /* const moveInsideUp = await Task.updateMany(
          { colId, "cards._id": cardId },
          { $inc: { "cards.$[ord].order": 1 } },
          {
            arrayFilters: [
              {
                "ord.order": { $gte: newIndex, $lt: oldIndex }
              }
            ]
          }
        ); */
        /* const setNewIndex = await Task.updateOne(
          { colId, "cards._id": cardId },
          { $set: { "cards.$.order": newIndex } }
        ) */
        setNewIndex(colId, cardId, newIndex);
        console.log("Moved up");
        res.status(200).json(`Moved up to index ${newIndex}`);
      }
      /* async function setNewIndex() {
        const index = await Task.updateOne(
          { colId, "cards._id": cardId },
          { $set: { "cards.$.order": newIndex } }
        )
      } */
      //End of "move inside the column"
      //############################################################################
    } else if (!name && colId && targetColId && cardId) {
      const cardId = req.body.cards._id;
      //console.log(JSON.stringify(req.body));
      const card = req.body.cards;
       moveToColumn(colId, targetColId, cardId, card);
      /* const taskSaved = await Task.findByIdAndUpdate(targetColId, { $push: { cards: body.cards } });
      const taskDeleted = await Task.findByIdAndUpdate(body.colId, { $pull: { cards: { _id: cardId } } }); */
      console.log("III if - przeniesienie do innej kolumny \n _____".brightCyan);
      res.status(200).json(`Moved to column ${targetColId}`);
    } else {
      console.log("BŁĄD".red);
    }
  }
  catch (err) {
    res.status(500).json(`Błąd: ${err}`)
  }
}