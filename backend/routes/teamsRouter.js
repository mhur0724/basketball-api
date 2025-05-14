const { Router } = require('express');
const teamsRouter = Router();
const {getTeams, getTeam} = require('../controllers/teamsController');

teamsRouter.get('/', getTeams);
teamsRouter.get('/:teamName', getTeam)

module.exports = teamsRouter;