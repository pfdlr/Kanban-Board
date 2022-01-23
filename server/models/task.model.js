const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = mongoose.model('Task', Task);