const pool = require("../db");
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    await pool.query(`
      INSERT INTO users (username, password)
      VALUES ($1, $2)
      `, [username, password]
      )
    // Just send back what you got, to verify
    res.status(200).json({ username, password });
  } catch (err) {
    res.status(500).send("Register user error: " + err.message);
  }
};

module.exports = { registerUser };
