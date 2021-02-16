'use strict'

const
	marsTerrainService = require('./marsTerrainService'),
	models = require('../models'),
	util = require('../shared/util'),
	Op = require('sequelize').Op;


async function createRobot(name) {
	const
		latestMarsTerrain = await marsTerrainService.retrieveLatestMarsTerrain(),
		newRobot = await models.Robot.create({
			Name: name,
			Status: util.CREATED_ROBOT_STATUS
		});

	await models.MarsTerrainToRobot.create({
		MarsTerrainId: latestMarsTerrain.dataValues.Id,
		RobotId: newRobot.dataValues.Id
	});
	return newRobot;
}
async function updateStatus(id, status) {
	await models.Robot.update(
		{ Status: status },
		{
			where: {
				Id: id
			}
		}
	);
}

async function retrieveLatestRobotAvailable() {
	return await models.MarsTerrain.findOne({
		where: {
			Status: { [Op.not]: util.LOST_ROBOT_STATUS }
		},
		order: ['Id', 'DESC'],
	});
}

module.exports = {
	createRobot,
	updateStatus,
	retrieveLatestRobotAvailable
}