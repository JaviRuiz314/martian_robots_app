'use strict'

const marsTerrainService = require('../service/marsTerrainService');

async function createMarsTerrain(req, res) {
	try {
		const marsTerrain = await marsTerrainService.createMarsTerrain(req.body.dimensionX, req.body.dimensionY);
		res.status(200).send('Mars terrain created with id: ' + marsTerrain.dataValues.Id);
	} catch (err) {
		console.log('createMarsTerrain unexpected error: ' + err.toString());
		res.send(500).send('Unexpected server error');
	}
}

module.exports = {
	createMarsTerrain
}