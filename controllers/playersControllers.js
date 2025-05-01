const { players } = require("../db");

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
  res.render('addPlayer', {title: "Add Player"});
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
  const {playerId} = req.params;
  const { name, team, position, points, assists, rebounds, fgMade, fgAttempted, threePMade, threePAttempted, freeThrowsMade, freeThrowsAttempted, minutesPerGame } = req.body;
  const player = players.find(player => player.id === Number(playerId));
  // i need to check if that playerId even exists
  if (!player) {
    return res.status(404).send('could not update player');
  }
  //  get the player and what the req was and update the info
  const updatedPlayerData = req.body;
  Object.assign(player,updatedPlayerData);
  res.render('player', {title: "Edit Player", player})
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
