import React from 'react'
import { useState } from 'react';

const playerForm = () => {
    const [formData, setFormData] = useState({});
    
    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev, [e.target.name] : e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting: ', formData);
        axios.put(`http://localhost:3000/players/${playerId}`, formData)
        .then(() => {
            navigate(`/players/${playerId}`)
        })
        .catch(err => {
            console.log('Error updating player', err);
        })
    }
  return (
    <form onSubmit={handleSubmit}>
            {Object.entries(formData).map(([key, value]) => {
                if (key !== 'id') {
                    return (
                        <div key={key}>
                            <label htmlFor={key}>{key}</label>
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
            <button type='submit'>Submit</button>
    </form>
  )
}

export default playerForm
