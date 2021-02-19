'use strict';

const
	express = require('express'),
	app = express.Router(),
	commandController = require('../controller/commadController');

app.post('/createnewcommand', commandController.createNewCommand);

module.exports = app;