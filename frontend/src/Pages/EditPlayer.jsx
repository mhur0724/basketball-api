import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPlayer = () => {
    const {playerId} = useParams();
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
     useEffect(() => {
        axios.get(`http://localhost:3000/players/${playerId}`)
        .then((response) => {
            setFormData(response.data);
            setLoading(false);
        })
        .catch(err => {
            console.log('Error fetching player', err);
            setLoading(false)
        })
    },[])

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev, [e.target.name] : e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/players/${playerId}`, formData)
        .then(() => {
            navigate(`/players/${playerId}`)
        })
        .catch(err => {
            console.log('Error updating player', err);
        })
    }

    if (loading) return <p>Fetching Edit Player Form</p>;
  return (
    <div>
        <h1>Edit Player</h1>
        <form onSubmit={handleSubmit}>
            {Object.entries(formData).map(([category, stat]) => {
                if (category !== 'id') {
                    return (
                        <div category={category}>
                            <label htmlFor={category}>{category}: </label>
                            <input 
                                type="text" 
                                id={category} 
                                name={category} 
                                value={formData[category] || ""}
                                required = {['name', 'team', 'position'].includes(category)}
                                onChange={handleChange}
                            />
                        </div>
                    )
                } 
                return null;
            })}
            <button type='submit'>Save Changes</button>
        </form>
    </div>
  )
}

export default EditPlayer
