import React from 'react'

const PlayerFormField = ({category, handleChange, formData}) => {
    return (
        <div>
            <label htmlFor={category}>{category} : </label>
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

export default PlayerFormField
