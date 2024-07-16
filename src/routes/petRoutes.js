const express = require('express');
const router = express.Router();
const controller = require('../controllers/petController');

router.get("/", controller.readAllpets)

router.get("/:pet_id", controller.readpetBypetid)

router.get("/:owner_id/owned", controller.readpetByid)

router.put("/:pet_id", controller.verifypoints,controller.updatepetownership, controller.updategameuserinfownership, controller.subtractpointsforownership, controller.resetpetstatsafterownership)

router.post("/:pet_id/newpet", controller.verifyaddnewpet,controller.updategameuserinfomutiplepet)

router.post("/", controller.createNewpet)

router.put("/:owner_id/:pet_id/feed", controller.verifyownership, controller.feedpet, controller.updatefeedpet)

router.put("/:owner_id/:pet_id/groom", controller.verifyownership, controller.groompet, controller.updategroompet)




module.exports = router;