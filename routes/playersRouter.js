const { Router } = require("express");
const { getPlayers, getPlayer, getAddPlayer, postPlayers, getUpdatePlayer, updatePlayer, deletePlayer} = require("../controllers/playersControllers");
const playersRouter = Router();

playersRouter.get("/add", getAddPlayer);
playersRouter.post("/", postPlayers);
playersRouter.get("/:playerId", getPlayer);
playersRouter.delete("/:playerId", deletePlayer);
playersRouter.get('/:playerId/edit', getUpdatePlayer)
playersRouter.patch("/:playerId", updatePlayer);
playersRouter.get("/", getPlayers);

module.exports = playersRouter;
