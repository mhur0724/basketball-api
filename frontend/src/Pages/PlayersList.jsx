import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
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
        <ul>
            {players.map(player => (
                <li key={player.id}>
                    <Link to={`/players/${player.id}`}>{player.name}</Link>
                </li>
            ))}
        </ul>
        <Link to="/players/add">
            <button>Add Player</button>
        </Link>
    </div>
  )
}

export default PlayersList
