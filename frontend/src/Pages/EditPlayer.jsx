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
            {Object.entries(formData).map(([key, value]) => {
                if (key !== 'id') {
                    return (
                        <div key={key}>
                            <label htmlFor={key}>{key}: </label>
                            <input 
                                type="text" 
                                id={key} 
                                name={key} 
                                value={value}
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
