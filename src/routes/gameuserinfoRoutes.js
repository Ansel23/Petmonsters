const express = require('express');
const router = express.Router();

const controller = require('../controllers/gameuserinfoController');

router.get("/", controller.readAllgameusersinfo)

router.get("/:user_id", controller.readgameusersinfobyid)




module.exports=router;
