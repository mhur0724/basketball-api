const pool = require('./db');


const createTeamRoster = async (req, res) => {

    try {
        const fetchTeams = async () => {
            const teamsQuery = 'DELETE FROM players'
            await pool.query(teamsQuery);
        
        }
        fetchTeams()


    } catch (err) {
        console.log('could not create table: ', err);
    }
}

createTeamRoster()
