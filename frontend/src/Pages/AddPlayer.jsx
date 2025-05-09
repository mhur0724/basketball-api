import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddPlayerFormField from '../components/AddPlayerFormField';
const AddPlayer = () => {
    const [categories, setCategories] = useState({});
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getPlayerCategories = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/players/add`);
            setCategories(response.data);
          } catch (err) {
            console.log('Error adding to players', err);
          } finally {
            setLoading(false)
          }
        } 
        getPlayerCategories();
    },[])

const handleChange = (e) => {
        setFormData(prev => ({
            ...prev, [e.target.name] : e.target.value
        }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post(`http://localhost:3000/players/`, formData)
        navigate(`/players`)
      } catch (err) {
        console.log('Error updating player', err);
      }
    }
    if (loading) return <p>Loading Player Form...</p>;

  return (
    <div>
      <h1>Add Player</h1>
      <form onSubmit={handleSubmit}>
        {categories
          .filter(category => category !== "id")
          .map(category => (
            <AddPlayerFormField
              key={category}
              category={category}
              handleChange={handleChange}
              formData={formData}
            />
        ))}
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default AddPlayer
