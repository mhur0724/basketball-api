// const { Router } = require("express");
// const { getPlayers} = require("../controllers/playersControllers");
// const playersRouter = Router();

// playersRouter.get("/", getPlayers);

// module.exports = playersRouter;
const { Router } = require("express");
const playersRouter = Router();

playersRouter.get("/", (req, res) => {
  console.log("✅ /players route hit");
  res.json([{ id: 1, name: "Test Player" }]);
});

module.exports = playersRouter;