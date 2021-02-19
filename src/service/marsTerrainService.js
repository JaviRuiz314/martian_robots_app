'use strict'

const models = require('../models');

function _buildQueryCondition(gridInfo) {
	let condition = '';
	if (gridInfo && gridInfo.gridId) {
		condition = { Id: parseInt(gridInfo.gridId) }
	}
	return condition;
}


async function createMarsTerrain(dimensionX, dimensionY) {
	const newMarsTerrain = await models.MarsTerrain.create({
		Dimension_X: dimensionX,
		Dimension_Y: dimensionY
	});

	return newMarsTerrain;
}

async function retrieveSelectedGridOrLatest(gridInfo) {
	const selectedGrid = await models.MarsTerrain.findOne({
		where: _buildQueryCondition(gridInfo),
		order: [['Id', 'DESC']],
	});

	return selectedGrid.dataValues;
}

module.exports = {
	createMarsTerrain,
	retrieveSelectedGridOrLatest
}