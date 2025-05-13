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
    const { teamId } = req.params;
    try {
        const team = await api.nba.getTeam(teamId);
        res.status(200).json(team.data)
    } catch(err) {
        res.status(500).send('could not get team: ', err)
    }
}

module.exports = {getTeams, getTeam}