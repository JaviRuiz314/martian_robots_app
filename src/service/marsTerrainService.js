'use strict'

const models = require('../models');


async function createMarsTerrain(dimensionX, dimensionY) {
	const newMarsTerrain = await models.MarsTerrain.create({
		Dimension_X: dimensionX,
		Dimension_Y: dimensionY
	});

	return newMarsTerrain;
}

module.exports = {
	createMarsTerrain
}