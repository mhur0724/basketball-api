import React from 'react'
import Card from 'react-bootstrap/Card'
import './TeamPlayer.css'
const TeamPlayerComponent = ({age, height, img, jersey_number, name, position, weight}) => {
  return (
      <Card className='player-card'>
          <Card.Img variant="top" src={img} alt={name} className='player-card-img' />
          <Card.Body>
          <Card.Title className='player-card-name'>{name}</Card.Title>
          <Card.Text className='player-card-description'>#{jersey_number}</Card.Text>
          <Card.Text className='player-card-description'>Position: {position}</Card.Text>
          <Card.Text className='player-card-description'>Height: {height}</Card.Text>
          <Card.Text className='player-card-description'>Weight: {weight}</Card.Text>
          <Card.Text className='player-card-description'>Age: {age}</Card.Text>
          </Card.Body>
      </Card>
  )
}

export default TeamPlayerComponent
