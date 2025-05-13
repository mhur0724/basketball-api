import axios from 'axios';
import { useEffect, useState } from 'react';
import TeamsComponent from '../../components/Teams/TeamsComponent';
import './Teams.css'
const Teams = () => {
    const [loading, setLoading] = useState(true);
    const [teams, setTeams] = useState([]);
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get('http://localhost:3000/teams');
                setTeams(response.data);
            } catch (err) {
                console.log('Error fetching teams: ', err);
            } finally {
                setLoading(false)
            }
        }
        fetchTeams();
    }, [])

    if (loading) return <p>Loading teams...</p>;
  return (
    <div className='teams-container'>
        {
            teams.map(({id, team,logo, conference}) => (
            <TeamsComponent key={id} id={id} team={team} logo={logo} conference={conference}/>
        ))}
    </div>
  )
}

export default Teams
