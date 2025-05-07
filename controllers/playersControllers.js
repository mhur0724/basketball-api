const { players, playerCategories } = require("../db");
const pool = require("../postgresdb");

const getPlayers = async (req, res) => {
  try {
    const players = await pool.query("SELECT * FROM players;");
    res.render("players", { title: "players", players: players.rows });
  } catch (err) {
    res.status(500).send("Could not get players");
  }
};

const getPlayer = async (req, res) => {
  const { playerId } = req.params;
  try {
    const player = await pool.query(
      `SELECT * FROM players WHERE id = ${playerId};`
    );
    res.render("player", {
      title: player.rows[0].name,
      player: player.rows[0],
    });
  } catch (err) {
    return res.status(404).send("Player not found");
  }
};

const getAddPlayer = (req, res) => {
  res.render("addPlayer", { title: "Add Player", playerCategories });
};

const postPlayers = async (req, res) => {
  const newPlayer = req.body;
  let categories = Object.keys(newPlayer).join(", ");
  let values = Object.values(newPlayer).map((value) =>
    value === "" ? null : `'${value}'`
  );

  let valueString = values.map((value) => `${value}`).join(", ");
  let query = `INSERT INTO players (${categories}) VALUES (${valueString});`;
  try {
    await pool.query(query);
    res.redirect("/players");
  } catch (err) {
    res.status(400).send("Could not add player");
  }
};

const getUpdatePlayer = async (req, res) => {
  const { playerId } = req.params;
  try {
    let player = await pool.query(
      `SELECT * FROM players WHERE id = ${playerId}`
    );
    res.render("editPlayer", { title: "Edit Player", player: player.rows[0] });
  } catch (err) {
    console.log();
    res.status(400).send("Could not get player");
  }
};
const updatePlayer = async (req, res) => {
  const { playerId } = req.params;
  const updatedPlayerData = req.body;
  try {
    let player = await pool.query(
      `SELECT * FROM players WHERE id = ${playerId};`
    );
    player = player.rows[0];
    Object.assign(player, updatedPlayerData);
    console.log(player);
    let setStatement = [];
    for (const [key, value] of Object.entries(player)) {
      setStatement.push(`${key} = '${value}'`);
    }
    console.log(setStatement);

    await pool.query(
      `UPDATE players SET ${setStatement.join(", ")} WHERE id = ${playerId}`
    );
    console.log("updated player");

    let updatedPlayer = await pool.query(
      `SELECT * FROM players WHERE id = ${playerId}`
    );
    console.log("retreived updated player");

    // res.render(`/players/${playerId}`, {
    //   title: updatedPlayer.rows[0].name,
    //   player: updatedPlayer.rows[0],
    // });
    res.render("/players");
  } catch (err) {
    res.status(404).send("Could not update player");
  }
  //   const updatedPlayerData = req.body;
  //   res.render("player", { title: "Edit Player", player });
};

const deletePlayer = async (req, res) => {
  const { playerId } = req.params;
  try {
    await pool.query(`DELETE FROM players WHERE id = ${playerId} `);
    res.status(200).json({ message: "Player deleted" });
  } catch (err) {
    return res.status(404).send("could not delete player");
  }
};

module.exports = {
  getPlayers,
  getPlayer,
  getAddPlayer,
  postPlayers,
  getUpdatePlayer,
  updatePlayer,
  deletePlayer,
};
