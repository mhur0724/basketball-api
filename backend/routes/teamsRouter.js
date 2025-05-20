const { Router } = require('express');
const teamsRouter = Router();
const {getTeams, getTeam} = require('../controllers/teamsControllers');

teamsRouter.get('/', getTeams);
teamsRouter.get('/:teamName', getTeam)

module.exports = teamsRouter;