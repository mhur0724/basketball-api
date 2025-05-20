const pool = require('../db');

const getFavoritePlayers = async (req, res) => {
    try {
        const favQuery = `
            SELECT 
            p.*
            FROM favorites f
            JOIN players p ON f.player_id = p.id
            ORDER BY p.id;
        `
        const favoritePlayers = await pool.query(favQuery);
        res.status(200).json(favoritePlayers.rows)
    } catch (err) {
        res.status(500).send('could not get teams: ' + err.message);
    }
}

const addFavoritePlayer = async (req, res) => {
    try {
        const { player_id, name, team } = req.body;
        await pool.query(
            `INSERT INTO favorites (player_id, player_name, team)
             VALUES ($1, $2, $3)`,
            [player_id, name, team]
        );
        res.status(200).send('Added player');
    } catch (err) {
        res.status(500).send('Could not add player: ' + err.message);
    }
}
const deleteFavoritePlayer = async (req, res) => {
    try {
        const {player_id} = req.params;
        await pool.query(`DELETE FROM favorites WHERE player_id = $1`, [player_id]);
        res.status(200).send('Deleted player')
    } catch (err) {
        res.status(500).send('could not delete player: ' + err.message)
    }
}

module.exports = {getFavoritePlayers, deleteFavoritePlayer, addFavoritePlayer}