const {Router} = require('express');
const {searchPlayer} = require('../controllers/playersControllersAPI')

const playersRouter = Router();

playersRouter.get('/:playerName', searchPlayer)

module.exports = playersRouter;