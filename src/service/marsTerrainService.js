'use strict'

const models = require('../models');


async function createMarsTerrain(dimensionX, dimensionY) {
	const newMarsTerrain = await models.MarsTerrain.create({
		Dimension_X: dimensionX,
		Dimension_Y: dimensionY
	});

	return newMarsTerrain;
}

async function retrieveLatestMarsTerrain() {
	return await models.MarsTerrain.findOne({
		order:[ ['Id', 'DESC']],
	});
}

module.exports = {
	createMarsTerrain,
	retrieveLatestMarsTerrain
}