const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/task.controller');
const Task = require('../models/task.model');

router.route('/board').get(TaskController.getBoard);
router.route('/column').post(TaskController.addColumn);
router.route('/column/:id').delete(TaskController.removeColumn);
router.route('/column/:id').patch(TaskController.renameColumn);
router.route('/card').patch(TaskController.addCard);
router.route('/card/:id').delete(TaskController.removeCard);
router.route('/card/:id').patch(TaskController.modifyCard);

module.exports = router;