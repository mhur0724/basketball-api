import React from 'react'
import { useParams } from 'react-router-dom'
const Team = () => {
    const {team} = useParams();
  return (
    <div>
        <p>Hello from the {team}</p>
    </div>
  )
}

export default Team
