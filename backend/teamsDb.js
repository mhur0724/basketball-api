const pool = require('./db');

const populatePlayersTable = async () => {
  try {
    let query = `
    SELECT * FROM favorites
     `
    await pool.query(query)
  } catch (err) {
    console.error('Error populating players table:', err);
  }
};

populatePlayersTable();
