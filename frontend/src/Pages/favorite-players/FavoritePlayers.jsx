import React from 'react'
import {useState, useEffect} from 'react';
import axios from 'axios';
import TeamPlayerComponent from '../../components/teamPlayer/teamPlayerComponent';
import '../Players/Players.css'
import './FavoritePlayers.css'
const FavoritePlayers = () => {
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    useEffect(() => {
        const getFavorites = async () => {
            try {
                const favorites = await axios.get('http://localhost:3000/favorite-players');
                setFavorites(favorites.data)
            } catch (err) {
                console.log('there was an error: ', err);
            } finally {
                setLoading(false)
            }
        }
        getFavorites();
    }, [])

    const handleRemoveFavorite = (player_id) => {
        setFavorites((prev) => prev.filter(player => player.id !== player_id));
    }

    if (loading) return <p>Loading favorite players..</p>
    if (favorites.length === 0) return <p>No favorite players</p>
  return (
    <div className='favorite-players-container players'>
        {favorites.map((player) => (
            <TeamPlayerComponent 
                key={player.id}
                {...player}
                favorite={true}
                player_id={player.id}
                onRemoveFavorite={handleRemoveFavorite}
            />
        ))}
    </div>
  )
}

export default FavoritePlayers
