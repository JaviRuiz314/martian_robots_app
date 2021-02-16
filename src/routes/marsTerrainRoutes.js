'use strict';

const
	express = require('express'),
	app = express.Router(),
	marsTerrainController = require('../controller/marsTerrainController');

app.post('/getnewmarsterrain', async (req, res) => {
	await marsTerrainController.createMarsTerrain(req, res);
});

module.exports = app;