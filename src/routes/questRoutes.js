
const express = require('express');
const router = express.Router();
const controller = require('../controllers/questController');



router.get("/", controller.readAllquests)

router.get("/:quest_id", controller.readquestbyid)

router.delete("/:quest_id",controller.updategameuserpoints, controller.deleteCompletedquestByid)









module.exports = router;