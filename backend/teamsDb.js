const pool = require('./db');

const populatePlayersTable = async () => {
  try {
    const teams = await pool.query(`SELECT team FROM teams`);
    
    for (const { team } of teams.rows) {
      const snake = team.toLowerCase().replace(/\s+/g, '_');

      const sql = `
        INSERT INTO players (name, team, jersey_number, position, age, height, weight, img, team_player_id)
        SELECT 
          name,
          '${team}' as team,
          jersey_number,
          position,
          age,
          height,
          weight,
          img,
          team_player_id
        FROM ${snake};
      `;
      
      const result = await pool.query(sql);
      console.log(`Inserted ${result.rowCount} players from team: ${team}`);
    }
    
    console.log('Finished populating players table.');
  } catch (err) {
    console.error('Error populating players table:', err);
  }
};

populatePlayersTable();
