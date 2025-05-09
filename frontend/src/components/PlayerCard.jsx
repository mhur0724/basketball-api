import React from 'react'
import {Link} from 'react-router-dom';

const PlayerCard = ({player}) => {
  return (
    <li>
        <Link to={`/players/${player.id}`}>{player.name}</Link>
    </li>
  )
}

export default PlayerCard
