import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Player = () => {
    const { playerId } = useParams();
    const [player, setPlayer] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    let url = `http://localhost:3000/players/${playerId}`;
    
    useEffect(() => {
        axios.get(url)
        .then((response) => {
            setPlayer(response.data);
            setLoading(false);
        })
        .catch(err => {
            console.log('Error fetching player', err);
            setLoading(false);
        })
    },[playerId])
    
    if (loading) return <p>loading player...</p>;
    if (!player) return <p>Player not found</p>;

    const handleDeletePlayer = () => {
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
        {Object.entries(player).map(([key, value]) => (
            <li key={key}>
            <strong>{key}:</strong> {value}
            </li>
        ))}
        </ul>
        <button onClick={handleDeletePlayer}>Delete Player</button>
        <button onClick={handleEditPlayer}>Edit Player</button>
        <button onClick={handlePlayersPageBtn}>Players Page</button>
    </div>
  )
}

export default Player
