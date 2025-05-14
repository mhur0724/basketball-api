import React from 'react'
import Card from 'react-bootstrap/Card'
import './TeamsComponent.css'
import { Link } from 'react-router-dom'
const TeamsComponent = ({team, logo, conference}) => {
  return (
    <Link className='team-card-link' to={`/teams/${team}`}>
      <Card className='team-card'>
          <Card.Img variant="top" src={`/team-logos/${logo}`} alt={logo} className='team-card-img' />
          <Card.Body>
          <Card.Title className='team-card-title'>{team}</Card.Title>
          <Card.Text className='team-card-conference'>{conference}</Card.Text>
          </Card.Body>
      </Card>
    </Link>
  )
}

export default TeamsComponent
