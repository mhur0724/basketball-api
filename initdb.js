const pool = require("./postgresdb");

async function createPlayersTable() {
  try {
    await pool.query(
      "CREATE TABLE IF NOT EXISTS PLAYERS (id SERIAL PRIMARY KEY, name VARCHAR(255), active BOOLEAN);"
    );
    console.log("table craeted");
  } catch (err) {
    console.error("Error creating table", err);
  } finally {
    pool.end();
  }
}

createPlayersTable();
