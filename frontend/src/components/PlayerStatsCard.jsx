import React from 'react'

const PlayerStatsCard = ({category, stat}) => {
    if (category === "id") {
        return null;
    } else {
    return (
        <li category={category}>
            <strong>{category}:</strong> {stat}
        </li>
    )}
}

export default PlayerStatsCard
