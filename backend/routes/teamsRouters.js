const { Router } = require('express');
const teamsRouter = Router();
const {getTeams} = require('../controllers/teamsController');

teamsRouter.get('/', getTeams);

module.exports = teamsRouter;