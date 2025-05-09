import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import PlayerCard from '../components/PlayerCard';
import axios from 'axios';
const PlayersList = () => {
    const [players, setPlayers] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/players');
                setPlayers(response.data);
            } catch (err) {
                console.log('Error fetching players: ', err);
            } finally {
                setLoading(false)
            }
        };
        fetchPlayers();
    }, [])

    if (loading) return <p>Loading players...</p>;
    if (!players) return <p>Failed to load players</p>;
    if (players.length == 0) {
        return (
            <div>
                <p>No players to show</p>
                <Link to="/players/add">
                    <button>Add Player</button>
                </Link>
            </div>
        )
    }
    return (
        <div>
            <ul>
                {players.map(player => (
                    <PlayerCard player={player} key={player.id}/>
                ))}
            </ul>
            <Link to="/players/add">
                <button>Add Player</button>
            </Link>
        </div>
    )
}

export default PlayersList
