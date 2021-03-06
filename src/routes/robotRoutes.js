'use strict';

const
	express = require('express'),
	app = express.Router(),
	robotController = require('../controller').Robot;

app.post('/getnewrobot', robotController.createNewRobot);
app.get('/retrievelostrobots', robotController.retrieveLostRobotsInformationOnGrid);

module.exports = app;