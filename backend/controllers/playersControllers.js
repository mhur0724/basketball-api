const pool = require("../db");
const getPlayers = async (req, res) => {
  try {
    const players = await pool.query(`SELECT * FROM players`);
    res.status(200).json(players.rows)
  } catch (err) {
    res.status(500).send("Could not get players");
  }
};

const getPlayer = async (req, res) => {
  const { playerId } = req.params;
  try {
    const player = await pool.query("SELECT * FROM players WHERE id = $1 LIMIT 1;", [
      playerId,
    ]);
    if (player.rows.length === 0) {
      return res.status(404).send("Player not found");
    }
    res.status(200).json(player.rows[0])
  } catch (err) {
    return res.status(500).send('Error fetching player')
  }
};

const getAddPlayer = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'players'
      ORDER BY ordinal_position
    `);
    const playerCategories = result.rows.map(row => row.column_name);
    res.status(200).json(playerCategories);
  } catch (err) {
    res.status(500).send("Could not get add player form");
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
    res.status(201).send('Player created');
  } catch (err) {
    res.status(500).send("Could not add player");
  }
};

const getUpdatePlayer = async (req, res) => {
  const { playerId } = req.params;
  try {
    let player = await pool.query(
      "SELECT * FROM players WHERE id = $1 LIMIT 1", [playerId]
    );
    res.status(200).json(player.rows[0]);
  } catch (err) {
    console.log();
    res.status(400).send("Could not get player");
  }
};
const updatePlayer = async (req, res) => {
  const { playerId } = req.params;
  const formData = req.body;
  try {
    let keys = Object.keys(formData).filter(key => key !== "id");
    let values = keys.map(key => formData[key] === "" ? null : formData[key]);
    let setStatement = keys.map((key,i) => `${key} = $${i+1}`).join(', ');
    values.push(playerId);
    await pool.query(
      `UPDATE players SET ${setStatement} WHERE id = $${values.length}`, values
    );
    res.sendStatus(204);
  } catch (err) {
    res.status(404).send("Could not update player");
  }
};

const deletePlayer = async (req, res) => {
  const { playerId } = req.params;
  try {
    await pool.query("DELETE FROM players WHERE id = $1;", [playerId]);
    res.sendStatus(204);
  } catch (err) {
    return res.status(404).send("could not delete player from railway");
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
