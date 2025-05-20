const pool = require('./db');

const populatePlayersTable = async () => {
  try {
    let query = `
    ALTER TABLE favorites ADD CONSTRAINT unique_player_id UNIQUE(player_id);
     `
    await pool.query(query)
    console.log('Finished populating players table.');
  } catch (err) {
    console.error('Error populating players table:', err);
  }
};

populatePlayersTable();
