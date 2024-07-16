const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController');


router.post('/', controller.createNewTask)

router.get('/', controller.readAlltasks)

router.get('/:id', controller.readTaskByid)

router.put('/:id', controller.updateTaskById)

router.delete('/:id', controller.updatetaskprogress,controller.addpointsaftertask, controller.deleteTaskByid)

module.exports = router;