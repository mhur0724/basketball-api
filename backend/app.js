const cors = require('cors');
const express = require("express");
const playersRouter = require("./routes/playersRouter");
const methodOverride = require('method-override');
const path = require("path");
const app = express();
const assetsPath = path.join(__dirname, "public");


app.use(cors({origin: 'http://localhost:5173'}));
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

app.use("/players", playersRouter);

const PORT = 3000;
app.listen(3000);
