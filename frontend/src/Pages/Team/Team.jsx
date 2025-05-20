import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Team.css";
import TeamPlayerComponent from '../../components/teamPlayer/teamPlayerComponent';
import SearchBar from '../../components/SearchBar/SearchBar';
const Team = () => {
    const [team, setTeam] = useState([]);
    const {teamName} = useParams();
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/teams/${teamName}`);
                const teamPlayers = res.data;
                setTeam(teamPlayers);
            } catch (err) {
                console.log('could not get team: ', err);
            } finally {
                setLoading(false);
            }
        };
        fetchTeam();
    }, [teamName]);

    const handlePlayerSearch = (value) => {
        setSearch(value)
    }
    
    const filteredPlayers = team.filter(player => player.name.toLowerCase().includes(search.toLowerCase()));
    
    if (loading) return <p>Loading team...</p>

    return (
        <div className='players-container'>
            <h1>{teamName} Players</h1>
            <SearchBar onSearch={handlePlayerSearch} />
            <div className='players'>
            {
                filteredPlayers.map((player) => {
                    return (
                        <TeamPlayerComponent 
                        key={player.id}
                        {...player}
                        player_id={player.id}
                        />
                    )
                })
            }
            </div>
        </div>
    )
}

export default Team
