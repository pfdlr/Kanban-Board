const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* const Task = new Schema({
  id: { type: 'String', required: true },
  title: { type: 'String', required: true },
  content: { type: 'String', required: true },
  author: { type: 'String', required: true },
}); */


const Task = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    cards: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            order: Number,
            name: String
        }
    ]
})



/* const Task = new Schema({
    id: Number,
    name: String,
    columns: [
        {
            id: Number,
            name: String,
            cards: [
                {
                    id: Number,
                    kanban_column_id: String,
                    name: String
                }
            ]
        }
    ]
}) */





module.exports = mongoose.model('Task', Task);