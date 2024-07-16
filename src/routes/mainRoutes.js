const express = require('express');
const router = express.Router();

const jwtMiddleware = require('..//middlewares/jwtMiddleware');
const bcryptMiddleware = require('..//middlewares/bcryptMiddleware')
const userController = require('..//controllers/userController')
const UserRoutes = require('./userRoutes');
const TaskRoutes = require('./taskRoutes');
const TaskprogressRoutes = require('./taskprogressRoutes');
const PetRoutes = require('./petRoutes');
const GameuserRoutes = require('./gameuserRoutes');
const QuestRoutes = require('./questRoutes');
const GameuserinfoRoutes = require('./gameuserinfoRoutes')
const messageRoutes = require('./messageRoutes');
const gameinfo = require('..//controllers/gameuserController')

router.use("/message", messageRoutes);

router.use("/users", UserRoutes);

router.use("/tasks", TaskRoutes)

router.use("/task_progress", TaskprogressRoutes)

router.use("/pets", PetRoutes)

router.use("/gameusers", GameuserRoutes)

router.use("/quests", QuestRoutes)

router.use("/gameuserinfo", GameuserinfoRoutes)

router.post("/register", userController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, userController.register, jwtMiddleware.generateToken,userController.transfergameuserinfo, jwtMiddleware.sendToken );

router.post("/login", userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);


module.exports = router;
