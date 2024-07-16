const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskprogressController');


router.post('/', controller.checktaskId, controller.checkuserId, controller.createNewTaskprogress)

router.get('/:id', controller.readTaskprogressByid)

router.get('/:user_id/history', controller.readtaskprogressbyuser)

router.put('/:id', controller.updateTaskprogressById)

router.delete('/:id', controller.deleteTaskprogressByid)





module.exports = router;