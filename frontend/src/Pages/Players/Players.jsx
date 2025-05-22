import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TeamPlayerComponent from '../../components/TeamPlayer/TeamPlayerComponent';
import SearchBar from '../../components/SearchBar/SearchBar';
import Dropdown from 'react-bootstrap/Dropdown';

const PlayersList = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [dropdown, setDropdown] = useState('Team');
    const [sortedPlayers, setSortedPlayers] = useState([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const API = import.meta.env.VITE_API_URL;
                const playersResponse = await axios.get(`${API}/players`);
                setPlayers(playersResponse.data)
            } catch (err) {
                console.log('error getting players: ', err);
            } finally {
                setLoading(false)
            }
        };
        fetchPlayers();
    }, []);

    const handleSearchPlayer = (value) => {
        setSearch(value);
    };

    useEffect(() => {
        const filtered = players.filter(player => player.name.toLowerCase().includes(search.toLowerCase())
        );

        let sorted = [...filtered];

        if (dropdown === 'Age Descending') {
            sorted.sort((a, b) => b.age - a.age);
        } else if (dropdown === 'Age Ascending') {
            sorted.sort((a, b) => a.age - b.age);
        } else if (dropdown === 'Position') {
            sorted.sort((a, b) => a.position.localeCompare(b.position));
        } else if (dropdown === 'Team') {
            sorted.sort((a, b) => a.team.localeCompare(b.team));
        }

        setSortedPlayers(sorted);
    }, [dropdown, search, players]);

    if (loading) return <p>Loading players...</p>;

    const handleClick = (e) => {
        setDropdown(e.target.textContent);
    };

    const dropDownItems = ['Team', 'Age Descending', 'Age Ascending', 'Position'];

    return (
        <div className='players-container'>
            <h1>Active Players</h1>
            <SearchBar onSearch={handleSearchPlayer} />
            <Dropdown>
                <Dropdown.Toggle variant='success' id="dropdown-basic">
                    Sort By: {dropdown}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                {
                    dropDownItems.map(item => (
                        <Dropdown.Item key={item} onClick={handleClick}>{item}</Dropdown.Item>
                    ))
                }
                </Dropdown.Menu>
            </Dropdown>
            <div className='players'>
                {sortedPlayers.map((player) => {
                    return (
                    <TeamPlayerComponent
                        key={player.id}
                        {...player}
                        player_id={player.id}
                    />
                    );
                })}
            </div>
        </div>
    );
};

export default PlayersList;
