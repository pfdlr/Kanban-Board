const express = require('express');
const router = express.Router();

const TaskController = require('../controllers/task.controller');
const Task = require('../models/task.model');

// get all columns with tasks

router.route('/board').get(TaskController.getBoard);
router.route('/column').post(TaskController.addColumn);
router.route('/column/:id').delete(TaskController.removeColumn);
router.route('/column/:id').patch(TaskController.renameColumn);
router.route('/card').patch(TaskController.addCard);
router.route('/card/:id').delete(TaskController.removeCard);
router.route('/card/:id').patch(TaskController.modifyCard);
//router.route('/card/:id').delete(TaskController.removeCard)
//router.route('/card/:id').patch(TaskController.moveCard);

/* router.get('/column/:id', (req, res, next) => {
    const columnId = req.params.id;
    console.log(columnId)
    Task.column.findById(columnId)
    .exec()
    .then((doc) => {console.log(doc)})
    .catch((err) => {console.log(err)})
}); */

/* app.get('/', (req, res) => res.send('Hello World!'));


app.post('/column/', (req, res) => { res.send('add column') });
app.put('/column/:id', (req, res) => {
    res.json(board.columns.find(x => x.id === req.params.id))
});
app.delete('/column/:id', (req, res) => { res.send('ID kolumny: ' + req.params.id) });

app.post('/card', (req, res) => { res.send("add card") });
app.put('/card/:id', (req, res) => { res.send('ID karty: ' + req.params.id) });
app.delete('/card/:id', (req, res) => { res.send('ID karty: ' + req.params.id) }); */










/* //single post
router.route('/posts/:id').get(TaskController.getSinglePost);

// add posts
router.route('/posts').post(TaskController.addPost);

// get posts by range
router.route('/posts/range/:startAt/:limit').get(TaskController.getPostsByRange); */

module.exports = router;