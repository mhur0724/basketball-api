const {Router} = require('express');
const favoritePlayersRouter = Router();
const {getFavoritePlayers, addFavoritePlayer, deleteFavoritePlayer} = require('../controllers/favoritePlayersControllers')

favoritePlayersRouter.get('/', getFavoritePlayers);
favoritePlayersRouter.post('/', addFavoritePlayer);
favoritePlayersRouter.delete('/:player_id', deleteFavoritePlayer)
module.exports = favoritePlayersRouter;