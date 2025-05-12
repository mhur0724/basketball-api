import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const SearchPlayer = () => {
  const [playerName, setPlayerName] = useState("");
  const [playerId, setPlayerId] = useState(null);

  const handleChange = (e) => {
    setPlayerName(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchPlayer(playerName)
  }

  const fetchPlayer = async (playerName) => {
    try {
        const response = await axios.get(`http://localhost:3000/player/${playerName}`);
        setPlayerId(response.data.response[0].id);
    } catch (err) {
        console.log('Error fetching players', err);
    }
  }

  return (
    <div>
        <form>
            <label htmlFor="">Search for Player</label>
            <input type="text" onChange={handleChange} />
            <button type='submit' onClick={handleSubmit}>Submit</button>
        </form>
        <p>Player Id: {playerId}</p>
    </div>
  )
}

export default SearchPlayer
