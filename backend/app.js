process.on('uncaughtException', (err) => {
  console.error('🔥 Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason) => {
  console.error('🔥 Unhandled Rejection:', reason);
});

const cors = require('cors');
const express = require("express");
const playersRouter = require('./routes/playersRouter');
const teamsRouter = require('./routes/teamsRouter');
const favoritePlayersRouter = require('./routes/favoritePlayersRouter');
const methodOverride = require('method-override');
const path = require("path");
const app = express();

app.use(cors()); // Enable CORS for frontend
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the "public" folder
app.use(express.urlencoded({ extended: true })); // Parse incoming form data
app.use(express.json()); // Parse incoming JSON data
app.use(methodOverride('_method')); // For supporting _method in form actions

// API route for players
app.use("/players", playersRouter);
app.use("/teams", teamsRouter);
app.use("/favorite-players", favoritePlayersRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
