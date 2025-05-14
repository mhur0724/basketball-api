import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Team.css";
import TeamPlayerComponent from '../../components/teamPlayer/teamPlayerComponent';
const Team = () => {
    const [team, setTeam] = useState([]);
    const {teamName} = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const teamData = await axios.get(`http://localhost:3000/teams/${teamName}`);
                setTeam(teamData.data)
            } catch (err) {
                console.log('could not get team: ', err);
            } finally {
                setLoading(false)
            }
        } 
        fetchTeam()
    },[])
    if (loading) return <p>Loading team...</p>
    return (
        <div className='players-container'>
            <p>{teamName} Players</p>
            <div className='players'>
            {
                team.map(({player_id, age, height, img, jersey_number, name, position, weight}) => (
                    <TeamPlayerComponent 
                    key={player_id}
                    age={age}
                    height={height}
                    img={img}
                    jersey_number={jersey_number}
                    name={name}
                    position={position}
                    weight={weight}
                    />
                ))
            }
            </div>
        </div>
    )
}

export default Team
