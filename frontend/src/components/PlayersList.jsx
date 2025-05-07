import React, {useEffect, useState} from 'react';
import axios from 'axios';
const PlayersList = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3000/players')
        .then((response) => {
            setPlayers(response.data);
            setLoading(false);
        })
        .catch((err) => {
            console.error('Error fetching players: ', err);
            setLoading(false);
        })
    }, [])

    if (loading) return <p>Loading players...</p>;
  return (
    <div>
        <h2>players list</h2>
        <ul>
            {players.map(player => (
                <li key={player.id}>{player.name} - {player.team}</li>
            ))}
        </ul>
    </div>
  )
}

export default PlayersList
