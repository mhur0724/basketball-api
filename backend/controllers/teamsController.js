const pool = require("../db");
const { BalldontlieAPI } = require("@balldontlie/sdk");

const api = new BalldontlieAPI({ apiKey: process.env.BALLDONTLIE_API_KEY });

const getTeams = async (req, res) => {
    try {
        const teams = await pool.query("SELECT * FROM teams;");
        res.status(200).json(teams.rows)
    } catch(err) {
        res.status(500).send('Could not get teams: ', err);
    }
};

const getTeam = async (req, res) => {
    const { teamName } = req.params;
    const tableName = teamName.toLowerCase().replace(/\s+/g, '_');
    try {
        const team = await pool.query(`SELECT * FROM ${tableName}`)
        res.status(200).json(team.rows)
    } catch(err) {
        res.status(500).send('backend could not get team and players: ', err)
    }
}

module.exports = {getTeams, getTeam}