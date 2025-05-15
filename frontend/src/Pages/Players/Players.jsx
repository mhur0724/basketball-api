import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TeamPlayerComponent from '../../components/teamPlayer/teamPlayerComponent';

const PlayersList = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            try {
                const fetchPlayers = async () => {
                    const playersResponse = await axios.get('http://localhost:3000/players');
                    setPlayers(playersResponse.data)
                }
                fetchPlayers();
            } catch (err) {
                console.log('error getting players: ', err);
            } finally {
                setLoading(false)
            }
    }, [])

    if (loading || !players.length) return <p>Loading players...</p>;


    return (
        <div className='players-container'>
            <h1>Active Players</h1>
            <div className='players'>
                {players.map(({ age, height, img, jersey_number, name, position, weight }, i) => (
                    <TeamPlayerComponent
                        key={i}
                        age={age}
                        height={height}
                        img={img}
                        jersey_number={jersey_number}
                        name={name}
                        position={position}
                        weight={weight}
                    />
                ))}
            </div>
        </div>
    );
}

export default PlayersList;
