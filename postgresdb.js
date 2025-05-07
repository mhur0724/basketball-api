const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

module.exports = pool;

let result = {
  name: "Matthew Hur",
  team: "Brooklyn Nets",
  position: "PF",
  points: "",
  assists: "",
  rebounds: "",
  fgMade: "",
  fg_attempted: "",
  three_p_made: "",
  three_p_attempted: "",
  free_throws_made: "",
  free_throws_attempted: "",
  minutes_per_game: "",
};
