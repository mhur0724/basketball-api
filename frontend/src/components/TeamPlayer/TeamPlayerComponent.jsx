import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import './TeamPlayerComponent.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
const TeamPlayerComponent = ({age, height, img, jersey_number, name, position, weight, team, favorite, player_id, onRemoveFavorite}) => {
  const [isFavorite, setIsFavorite] = useState();
  useEffect(() => {
    setIsFavorite(favorite);
  }, [favorite])

const handleToggleFavorite = async () => {
  setIsFavorite(prev => !prev);
  try {
    const API = import.meta.env.VITE_API_URL;
    if (!isFavorite) {
      await axios.post(`${API}/favorite-players`, { player_id, name, team });
    } else {
      await axios.delete(`${API}/favorite-players/${player_id}`);
      if (onRemoveFavorite) {
        onRemoveFavorite(player_id);
      }
    }
  } catch (err) {
    console.error(err);
    setIsFavorite(prev => !prev); // revert if error
  }
};

  return (
      <Card className='player-card'>
          <Card.Img variant="top" src={img} alt={name} className='player-card-img' />
          <button className='favorite-btn' onClick={handleToggleFavorite}>{isFavorite ? <FavoriteIcon className='favorite'/> : <FavoriteBorderIcon className='not-favorite'/>}</button>
          <Card.Body>
          <Card.Title className='player-card-name'>{name}</Card.Title>
          {team && <Card.Text className='player-card-description player-team'>Team: {team}</Card.Text>}
          <Card.Text className='player-card-description player-jersey'>Jersey Number: {jersey_number}</Card.Text>
          <Card.Text className='player-card-description player-position'>Position: {position}</Card.Text>
          <Card.Text className='player-card-description player-height'>Height: {height}</Card.Text>
          <Card.Text className='player-card-description player-weight'>Weight: {weight}</Card.Text>
          <Card.Text className='player-card-description player-age'>Age: {age}</Card.Text>
          </Card.Body>
      </Card>
  )
}

export default TeamPlayerComponent
