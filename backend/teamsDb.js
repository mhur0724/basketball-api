const pool = require('./db');

const populatePlayersTable = async () => {
  try {
    let query = `
        CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
    );
     `
    await pool.query(query)
  } catch (err) {
    console.error('Error populating players table:', err);
  }
};

populatePlayersTable();
