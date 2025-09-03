const { Router } = require("express");
const registerRouter = Router();
const { registerUser } = require("../controllers/registerControllers");

registerRouter.post("/", registerUser);

module.exports = registerRouter;

