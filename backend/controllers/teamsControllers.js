const pool = require("../db");

const getTeams = async (req, res) => {
    try {
        const teams = await pool.query("SELECT * FROM teams;");
        res.status(200).json(teams.rows)
    } catch(err) {
        res.status(500).send('Could not get teams: ' + err.message);
    }
};

const getTeam = async (req, res) => {
  const { teamName } = req.params;
  const allowedTeamNames = [
    'Atlanta Hawks',
    'Boston Celtics',
    'Brooklyn Nets',
    'Charlotte Hornets',
    'Chicago Bulls',
    'Cleveland Cavaliers',
    'Dallas Mavericks',
    'Denver Nuggets',
    'Detroit Pistons',
    'Golden State Warriors',
    'Houston Rockets',
    'Indiana Pacers',
    'Los Angeles Clippers',
    'Los Angeles Lakers',
    'Memphis Grizzlies',
    'Miami Heat',
    'Milwaukee Bucks',
    'Minnesota Timberwolves',
    'New Orleans Pelicans',
    'New York Knicks',
    'Oklahoma City Thunder',
    'Orlando Magic',
    'Philadelphia 76ers',
    'Phoenix Suns',
    'Portland Trail Blazers',
    'Sacramento Kings',
    'San Antonio Spurs',
    'Toronto Raptors',
    'Utah Jazz',
    'Washington Wizards'
  ];
  if (!allowedTeamNames.includes(teamName)) {
    return res.status(400).send('Invalid team name');
  }

  try {
  const query = `
    SELECT
        p.*,
        CASE WHEN f.player_id IS NOT NULL THEN true ELSE false END AS favorite
    FROM players p
    LEFT JOIN favorites f ON p.id = f.player_id
    WHERE p.team = $1
    ORDER BY p.id;
  `;

const result = await pool.query(query, [teamName]);
    res.status(200).json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).send('Backend could not get team and players');
  }
};

module.exports = {getTeams, getTeam}