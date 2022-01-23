const Task = require('./models/task.model');
const mongoose = require('mongoose');

const loadTestData = async () => {
    const board = [

        {
            _id: new mongoose.Types.ObjectId(),
            name: "to do",
            cards: [
                {
                    _id: new mongoose.Types.ObjectId(),
                    order: 0,
                    name: "Task 1 to do"
                },
                {
                    _id: new mongoose.Types.ObjectId(),
                    order: 1,
                    name: "Task 2 to do"
                }
            ]
        },
        {
            _id: new mongoose.Types.ObjectId(),
            name: "at work",
            cards: [
                {
                    _id: new mongoose.Types.ObjectId(),
                    order: 0,
                    name: "Task 1 at work"
                }
            ]
        },
        {
            _id: new mongoose.Types.ObjectId(),
            name: "done",
            cards: [
                {
                    _id: new mongoose.Types.ObjectId(),
                    order: 0,
                    name: "Task 1 done"
                }
            ]
        }

    ];


    /* const loadTestData = async () => {
        const board = {
            id: "1",
            name: "board",
            columns: [
                {
                    id: "2",
                    name: "kolumna",
                    cards: [
                        {
                            id: "3",
                            order: "4",
                            name: "jaks nazwa"
                        },
                        {
                            id: "6",
                            order: "7",
                            name: "jaks nazwa"
                        }
                    ]
                },
                {
                    id: "4",
                    name: "kolumna2",
                    cards: [
                        {
                            id: "5",
                            order: "4",
                            name: "ee jaks nazwa"
                        }
                    ]
                }
            ]
        }; */
    // console.log(board);
    try {
        let counter = await Task.countDocuments();
        if (counter === 0) {
            console.log('No Tasks. Loading data...');
            await Task.create(board);
            console.log('Test data has been successfully loaded');
        }
    } catch (err) {
        console.log('Couldn\'t load test data', err);
    }
}


module.exports = loadTestData;
