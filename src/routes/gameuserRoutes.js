const express = require('express');
const router = express.Router();
const controller = require('../controllers/gameuserController');



router.get("/", controller.readAllgameusers)

router.post("/", controller.checkingemail, controller.createNewgameuser, controller.transfergameuserinfo)

router.put("/:gameuser_id", controller.updategameuserById)

router.delete("/:gameuser_id", controller.deletegameuserByid, controller.deletegameuserinfoByid)









module.exports = router;