const express = require("express");
const playersRouter = require("./routes/playersRouter");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

app.use("/players", playersRouter);

const PORT = 3000;
app.listen(3000);
