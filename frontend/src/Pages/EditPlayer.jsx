import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PlayerFormField from '../components/PlayerFormField';

const EditPlayer = () => {
    const {playerId} = useParams();
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const getPlayerData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/players/${playerId}`);
                setFormData(response.data);
            } catch (err) {
                console.log('Error fetching player', err);
            } finally {
                setLoading(false);
            }
        }
        getPlayerData();
    },[])
    console.log(formData);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev, [e.target.name] : e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/players/${playerId}`, formData);
            navigate(`/players/${playerId}`)
        } catch (err) {
            console.log('Error updating player', err);
        }
    }

    if (loading) return <p>Fetching Edit Player Form</p>;
    return (
        <div>
            <h1>Edit Player</h1>
                <form onSubmit={handleSubmit}>
                    {Object.keys(formData)
                        .filter((category) => category !== "id")
                        .map((category) => (
                            <PlayerFormField
                            key={category}
                            category={category}
                            handleChange={handleChange}
                            formData={formData}
                            />
                        ))
                    }
                    <button type='submit'>Submit</button>
                </form>
        </div>
    )
}

export default EditPlayer
