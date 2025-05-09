import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AddPlayer = () => {
    const [categories, setCategories] = useState({});
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/players/add`)
        .then((response) => {
            setCategories(response.data);
            setLoading(false);
        })
        .catch(err => {
            console.log('Error adding to players', err);
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
        axios.post(`http://localhost:3000/players/`, formData)
        .then(() => {
            navigate(`/players`)
        })
        .catch(err => {
            console.log('Error updating player', err);
        })
    }
    if (loading) return <p>Loading Player Form...</p>;

  return (
    <form onSubmit={handleSubmit}>
      {
        categories.map((category,i) => {
          if (category !== "id") {
            return (
              <div key={i}>
                <label htmlFor={category}>{category}: </label>
                <input 
                    type="text" 
                    id={category} 
                    name={category} 
                    value=""
                    onChange={handleChange}
                />
              </div>
            )
          }
        return null;
        })
      }
      <button type='submit'>Submit</button>
    </form>
  )
}

export default AddPlayer
