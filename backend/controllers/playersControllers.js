const pool = require("../db");
const getPlayers = async (req, res) => {
  try {
    const query = `
      SELECT 
        p.*, 
        CASE WHEN f.player_id IS NOT NULL THEN true ELSE false END AS favorite
      FROM players p
      LEFT JOIN favorites f ON p.id = f.player_id
      ORDER BY p.id;
    `;
    const players = await pool.query(query);
    res.status(200).json(players.rows);
  } catch (err) {
    res.status(500).send("Could not get players");
  }
};

module.exports = {
  getPlayers,
};
