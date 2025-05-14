const cors = require('cors');
const express = require("express");
// const playersRouter = require('./routes/playersRouterAPI');
const playersRouter = require('./routes/playersRouter');
const methodOverride = require('method-override');
const path = require("path");
const teamsRouter = require('./routes/teamsRouter');
const app = express();

app.use(cors({ origin: 'http://localhost:5173' })); // Enable CORS for frontend
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the "public" folder
app.use(express.urlencoded({ extended: true })); // Parse incoming form data
app.use(express.json()); // Parse incoming JSON data
app.use(methodOverride('_method')); // For supporting _method in form actions

// API route for players
// app.use("/player", playersRouter);
app.use("/players", playersRouter);
app.use("/teams", teamsRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
