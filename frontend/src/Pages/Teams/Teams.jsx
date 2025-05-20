import axios from 'axios';
import { useEffect, useState } from 'react';
import TeamsComponent from '../../components/Teams/TeamsComponent';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import './Teams.css'
import SearchBar from '../../components/SearchBar/SearchBar';
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

    const filteredSearchedTeams = teams.filter(team =>
    (conference === 'All' || team.conference === conference) &&
    team.team.toLowerCase().includes(search.toLowerCase())
    );

    const handleSearchTeam = (value) => {
        setSearch(value)
    }

    const conferences = ['Western', 'All', 'Eastern'];

if (loading) return <p>Loading teams...</p>;
  return (
    <div className='teams-container'>
        <h1>{conference} Teams</h1>
        <ButtonGroup className='buttons'>
        {
            conferences.map((conf) => (
                <Button key={conf} onClick={() => setConference(conf)} className={conference === conf ? 'active': ''}>{conf}</Button>
            ))
        }
        </ButtonGroup>
        <SearchBar onSearch={handleSearchTeam}/>
        <div className='teams'>
            {
                filteredSearchedTeams.length < 1 ? <p>Could not find team</p> : 
                filteredSearchedTeams.map(({id, team, logo, conference}) => 
                (
                <TeamsComponent key={id} team={team} logo={logo} conference={conference}/>
            ))}
        </div>
    </div>
  )
}

export default Teams
