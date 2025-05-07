const pool = require("../db");

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
    const player = await pool.query(`SELECT * FROM players WHERE id = $1;`, [
      playerId,
    ]);
    res.render("player", {
      title: player.rows[0].name,
      player: player.rows[0],
    });
  } catch (err) {
    return res.status(404).send("Player not found");
  }
};

const getAddPlayer = async (req, res) => {
  try {
    const players = await pool.query(`SELECT * FROM players`);
    let playerCategories = Object.keys(players._prebuiltEmptyResultObject);
    res.render("addPlayer", { title: "Add Player", playerCategories });
  } catch (err) {
    res.stat(500).send("Could not get add player form");
  }
};

const postPlayers = async (req, res) => {
  const newPlayer = req.body;
  let categories = Object.keys(newPlayer).join(", ");
  let values = Object.values(newPlayer).map((value) =>
    value === "" ? null : value
  );

  const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");

  let query = `INSERT INTO players (${categories}) VALUES (${placeholders});`;
  try {
    await pool.query(query, values);
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
      value === "" ? null : value;
      setStatement.push(`${key} = '${value}'`);
    }
    console.log(setStatement);
    console.log(
      `UPDATE players SET ${setStatement.join(", ")} WHERE id = ${playerId}`
    );

    await pool.query(
      `UPDATE players SET ${setStatement.join(", ")} WHERE id = ${playerId}`
    );
    console.log("updated player");

    console.log("retreived updated player");
    return getPlayer(req, res);
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
