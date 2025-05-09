import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PlayerStatsCard from '../components/PlayerStatsCard';

const Player = () => {
    const { playerId } = useParams();
    const [player, setPlayer] = useState({});
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/players/${playerId}`);
                setPlayer(response.data);
            } catch (err) {
                console.log('Error fetching players: ', err);
            }   finally {
                setLoading(false)
            }
        }
        fetchPlayer();
    },[playerId])
    
    if (loading) return <p>loading player...</p>;
    if (!player) return <p>Failed to load player</p>;

    const handleDeletePlayer = async () => {
        try {
            await axios.delete(`http://localhost:3000/players/${playerId}`)
            navigate('/players');
        } catch (err) {
            console.log('could not delete players', err);
        }
    }

    const handleEditPlayer = () => {
        navigate(`/players/${playerId}/edit`)
    }

    const handlePlayersPageBtn = () => {
        navigate('/players');
    }

  return (
    <div>
        <h1>{player.name}</h1>
        <ul>
            {
                Object.entries(player).map(([category, stat],i) => 
                    <PlayerStatsCard 
                        key={i} 
                        category={category} 
                        stat={stat ?? 'N/A'}
                    />
                )
            }
        </ul>
        <button onClick={handleDeletePlayer}>Delete Player</button>
        <button onClick={handleEditPlayer}>Edit Player</button>
        <button onClick={handlePlayersPageBtn}>Players Page</button>
    </div>
  )
}

export default Player
