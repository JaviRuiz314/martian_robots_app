'use strict'

const
	marsTerrainService = require('./marsTerrainService'),
	models = require('../models'),
	util = require('../shared/util'),
	Op = require('sequelize').Op;


async function createRobot(name) {
	try {
		console.log(name);
		const
			transaction = await models.Robot.sequelize.transaction(),
			latestMarsTerrain = await marsTerrainService.retrieveLatestMarsTerrain(),
			newRobot = await models.Robot.create({
				Name: name,
				Status: util.CREATED_ROBOT_STATUS
			}, { transaction });

		await models.MarsTerrain2Robot.create({
			MarsTerrainId: latestMarsTerrain.dataValues.Id,
			RobotId: newRobot.dataValues.Id
		}, { transaction });
		transaction.commit();
		return newRobot;
	} catch (error) {
		transaction.rollback();
		console.log('createRobot | unexpected error: ' + error);
		throw error;
	}
}
async function updateRobotStatus(id, status) {
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
	return await models.Robot.findOne({
		where: {
			Status: { [Op.not]: util.LOST_ROBOT_STATUS }
		},
		order: [['Id', 'DESC']],
	});
}

module.exports = {
	createRobot,
	updateRobotStatus,
	retrieveLatestRobotAvailable
}