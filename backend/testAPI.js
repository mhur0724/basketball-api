const { BalldontlieAPI } = require("@balldontlie/sdk");
require('dotenv').config();
const axios = require('axios');
const api = new BalldontlieAPI({ apiKey: process.env.BALLDONTLIE_API_KEY });

const testBallDontLie = async () => {
    try {
        // Fetch all teams
        const teams = await api.nba.getGames({
            seasons: [2024],
            postseason: true
        });
        console.log(teams);
    } catch (err) {
        console.log('Error getting team', err);
    }
}

testBallDontLie();