import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
const Team = () => {
    const [team, setTeam] = useState({});
    const {teamId} = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const teamData = await axios.get(`http://localhost:3000/teams/${teamId}`);
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
        <div>
            <p>Hello from the {team.full_name}</p>
        </div>
    )
}

export default Team
