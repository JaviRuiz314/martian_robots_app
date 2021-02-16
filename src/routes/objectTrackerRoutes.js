'use strict';

const
	express = require('express'),
	app = express.Router(),
	objectTrackerController = require('../controller/objectTrackerController');

app.get('/executeinstructions', async (req, res) => {
	await objectTrackerController.receiveInstructions(req, res);
});

module.exports = app;