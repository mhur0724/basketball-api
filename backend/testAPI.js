const { BalldontlieAPI } = require("@balldontlie/sdk");
require('dotenv').config();

const api = new BalldontlieAPI({ apiKey: process.env.BALLDONTLIE_API_KEY });

const getTeam = async () => {
    try {
        // Fetch all teams
        const teams = await api.nba.getTeams();
        console.log(teams);
    } catch (err) {
        console.log('Error getting team', err);
    }
}

getTeam();