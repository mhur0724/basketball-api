const { Router } = require("express");
const { getPlayers, getPlayer, postPlayers, updatePlayer, deletePlayer } = require("../controllers/playersControllers");
const playersRouter = Router();

playersRouter.get("/", getPlayers);
playersRouter.get("/:playerId", getPlayer);
playersRouter.post("/", postPlayers);
playersRouter.put("/:playerId", updatePlayer);
playersRouter.delete("/:playerId", deletePlayer);

module.exports = playersRouter;
