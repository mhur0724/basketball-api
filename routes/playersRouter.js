const { Router } = require("express");
const { getPlayers, getPlayer } = require("../controllers/playersControllers");
const playersRouter = Router();

playersRouter.get("/", getPlayers);
playersRouter.get("/:playerId", getPlayer);

playersRouter.post("", (req, res) => {
  res.send("hello");
});

playersRouter.put("/:playerId", (req, res) => {
  res.send("hello");
});

playersRouter.delete("/:playerId", (req, res) => {
  res.send("hello");
});

module.exports = playersRouter;
