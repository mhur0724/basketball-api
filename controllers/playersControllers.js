const { players } = require("../db");

const getPlayers = (req, res) => {
  res.render("players", { title: "Players", players: players });
};

const getPlayer = (req, res) => {
  const { playerId } = req.params;
  console.log(playerId);

  const player = players.find((player) => player.id === Number(playerId));
  if (!player) {
    res.status(404).send("Player not found");
  }
  res.render("player", { title: player.name, player });
};

module.exports = { getPlayers, getPlayer };
