const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.post('/',  controller.checkingemail, controller.createNewUser);

router.get('/', controller.readAllUser)

router.get('/:id', controller.readUserByid)

router.put('/:id', controller.checkingupdate, controller.updateuserById)

router.delete('/:id', controller.deleteusersByid)



module.exports = router;