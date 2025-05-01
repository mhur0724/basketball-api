const { Router } = require("express");
const { getPlayers, getPlayer, postPlayer } = require("../controllers/playersControllers");
const playersRouter = Router();

playersRouter.get("/", getPlayers);
playersRouter.get("/:playerId", getPlayer);

playersRouter.post("/", postPlayer);

playersRouter.put("/:playerId", (req, res) => {
  res.send("hello");
});

playersRouter.delete("/:playerId", (req, res) => {
  res.send("hello");
});

module.exports = playersRouter;
