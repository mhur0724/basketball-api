require("dotenv").config();
const axios = require("axios");

const searchPlayer = async (req, res) => {  
  try {
    const {playerName} = req.params;
    const response = await axios.get(`https://v1.basketball.api-sports.io/players?search=${playerName}`, {
      headers: {
        'x-rapidapi-key': process.env.API_BASKETBALL_KEY,
        'x-rapidapi-host': process.env.API_BASKETBALL_HOST
      }
    });

    // Send the data back in JSON format
    res.status(200).json(response.data);
  } catch (err) {
    console.error("Error fetching player:", err);
    res.status(500).send("Error fetching player");
  }
};

module.exports = {searchPlayer}
