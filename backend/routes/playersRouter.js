const { Router } = require("express");
const { getPlayers} = require("../controllers/playersControllers");
const playersRouter = Router();

playersRouter.get("/", getPlayers);

module.exports = playersRouter;
