const { players , playerCategories } = require("../db");

const getPlayers = (req, res) => {
  res.render("players", { title: "Players", players: players });
};

const getPlayer = (req, res) => {
  const { playerId } = req.params;
  const player = players.find((player) => player.id === Number(playerId));
  if (!player) {
    return res.status(404).send("Player not found");
  }
  res.render("player", { title: player.name, player });
};

const getAddPlayer = (req,res) => {
  res.render('addPlayer', {title: "Add Player", playerCategories});
}
const postPlayers = (req,res) => {
  const newPlayer = req.body;
  if (!newPlayer.name || !newPlayer.team) {
   return res.status(404).send('New Player not added')
  }
  newPlayer.id = players.length + 1;
  players.push(newPlayer);
  res.redirect('/players');
}

const getUpdatePlayer = (req,res) => {
  const {playerId} = req.params;
  const player = players.find(player => player.id === Number(playerId));
  res.render('editPlayer', {title: "Edit Player", player})
}
const updatePlayer = (req, res) => {
  const { playerId } = req.params;
  const player = players.find(p => p.id === Number(playerId));

  if (!player) {
    return res.status(404).send('Player not found');
  }

  const updatedData = req.body;

  // Update each field in the player with the submitted data
  for (const key in updatedData) {
    if (player.hasOwnProperty(key)) {
      player[key] = updatedData[key];
    }
  }

  res.redirect(`/players/${playerId}`);
}

const deletePlayer = (req, res) => {
  const {playerId} = req.params;
  const playerIndex = players.findIndex(player => player.id === Number(playerId));
  if (playerIndex === -1) {
    return res.status(404).send('could not delete player');
  }
  players.splice(playerIndex, 1);
  res.status(200).json({ message: 'Player deleted' });
}


module.exports = { getPlayers, getPlayer, getAddPlayer, postPlayers, getUpdatePlayer, updatePlayer, deletePlayer };
