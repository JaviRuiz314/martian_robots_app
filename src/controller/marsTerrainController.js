'use strict'

const marsTerrainService = require('../service/marsTerrainService');
const util = require('../shared/util');

function _validateGridCoordinates(xCoordinate, yCoordinate) {
	const isGridCoordiantesValid = ( xCoordinate <= util.GRID_LIMIT_VALUE && yCoordinate <= util.GRID_LIMIT_VALUE);
	return isGridCoordiantesValid;
}

async function createMarsTerrain(req, res) {
	try {
		if (_validateGridCoordinates(req.body.dimensionX, req.body.dimensionY)) {
			const marsTerrain = await marsTerrainService.createMarsTerrain(req.body.dimensionX, req.body.dimensionY);
			res.status(200).send('Mars terrain created with id: ' + marsTerrain.dataValues.Id);
		}

	} catch (err) {
		console.log('createMarsTerrain unexpected error: ' + err.toString());
		res.send(500).send('Unexpected server error');
	}
}

module.exports = {
	createMarsTerrain
}