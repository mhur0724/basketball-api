const pool = require("../db");

const getTeams = async (req, res) => {
    try {
        const teams = await pool.query("SELECT * FROM teams;");
        res.status(200).json(teams.rows)
    } catch(err) {
        res.status(500).send('Could not get teams');
    }
};

module.exports = {getTeams}