'use strict'

const marsTerrainService = require('../service/marsTerrainService');
const util = require('../shared/util');

function _validateGridCoordinates(xCoordinate, yCoordinate) {
	const
		areGridCoordinatesPresentOnTheRequest = (xCoordinate && yCoordinate),
		areGridCoordinatesBetweenLimits = (xCoordinate <= util.GRID_LIMIT_VALUE && yCoordinate <= util.GRID_LIMIT_VALUE),
		areGridCoordinatesPositive = (xCoordinate >= 0 && yCoordinate >= 0);

	if (!areGridCoordinatesPresentOnTheRequest) {
		throw "Grid coordinates X and Y must exist on the body of the request";
	} else if (!areGridCoordinatesBetweenLimits) {
		throw "Grid coordinates must not exceed 50";
	} else if (!areGridCoordinatesPositive) {
		throw "Grid coordinates must exist and be a positive integer";
	}
	return true;
}

async function createMarsTerrain(req, res) {
	try {
		if (_validateGridCoordinates(req.body.dimensionX, req.body.dimensionY)) {
			const marsTerrain = await marsTerrainService.createMarsTerrain(req.body.dimensionX, req.body.dimensionY);
			res.status(200).send('Mars terrain created with id: ' + marsTerrain.dataValues.Id);
		}

	} catch (err) {
		console.log('createMarsTerrain unexpected error: ' + err.toString());
		res.status(500).send('Unexpected server error: ' + err.toString());
	}
}

module.exports = {
	createMarsTerrain
}