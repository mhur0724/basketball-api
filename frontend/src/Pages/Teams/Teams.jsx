import axios from 'axios';
import { useEffect, useState } from 'react';
import TeamsComponent from '../../components/Teams/TeamsComponent';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import './Teams.css'
const Teams = () => {
    const [loading, setLoading] = useState(true);
    const [teams, setTeams] = useState([]);
    const [conference, setConference] = useState('All');
    const [search, setSearch] = useState('');

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

    const filteredTeams = teams.filter(team => conference === 'All' ? true : team.conference === conference);

    const searchedTeam = filteredTeams.filter(team => search === '' ? true : team.team.toLowerCase().includes(search.toLowerCase()))

    const handleSearchTeam = (e) => {
        setSearch(e.target.value)
    }
    
    if (loading) return <p>Loading teams...</p>;
  return (
    <div className='teams-container'>
        <ButtonGroup className='buttons'>
            <Button 
                onClick={() => setConference('Western')} 
                className={conference == 'Western' ? 'active' : ''}
            >Western</Button>
            <Button onClick={() => setConference('All')} className={conference == 'All' ? 'active' : ''}>All</Button>
            <Button onClick={() => setConference('Eastern')} className={conference == 'Eastern' ? 'active' : ''}>Eastern</Button>
        </ButtonGroup>
        <Form className='shadow-none' onKeyDown={e => {if (e.key === 'Enter') e.preventDefault()}}>
            <Form.Control type="text" placeholder="Enter Team..." onChange={handleSearchTeam} />
        </Form>
        <p>{}</p>
        <div className='teams'>
            {
                searchedTeam.length < 1 ? <p>Could not find team</p> : 
                searchedTeam.map(({id, team, logo, conference}) => 
                (
                <TeamsComponent key={id} team={team} logo={logo} conference={conference}/>
            ))}

        </div>
    </div>
  )
}

export default Teams
