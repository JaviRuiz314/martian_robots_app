'use strict'

const
	models = require('../models'),
	util = require('../shared/util');


async function createRobot(name) {
	const latestMarsTerrain = await models.MarsTerrain.findOne({
		order: ['Id', 'DESC'],
	});
	const newRobot = await models.Robot.create({
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

module.exports = {
	createRobot,
	updateStatus
}