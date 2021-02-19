'use strict'

const
	marsTerrainService = require('./marsTerrainService'),
	models = require('../models'),
	util = require('../shared/util'),
	Op = require('sequelize').Op;


async function createRobot(name) {
	try {
		const
			latestMarsTerrain = await marsTerrainService.retrieveSelectedGridOrLatest(),
			newRobot = await models.Robot.create({
				Name: name,
				Status: util.CREATED_ROBOT_STATUS
			});

		await models.MarsTerrain2Robot.create({
			MarsTerrainId: latestMarsTerrain.Id,
			RobotId: newRobot.dataValues.Id
		});
		return newRobot;
	} catch (error) {
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

async function updateLostRobotStatus(id, position, command) {
	await models.Robot.update(
		{
			Status: util.LOST_ROBOT_STATUS,
			LostGridPosition: [position[0], position[1]],
			LostGridOrientation: position[2],
			LastKnownCommand: command
		},
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

async function findLostRobotsScent(lastRobotPosition, lastKnownCommand, gridId) {
	return await models.Robot.findAll({
		where: {
			[Op.and]: [
				{ Status: util.LOST_ROBOT_STATUS },
				{ LastKnownCommand: lastKnownCommand },
				{ LostGridOrientation: lastRobotPosition[2] },
				{ LostGridPosition: [lastRobotPosition[0], lastRobotPosition[1]] }
			]
		},
		include: {
			model: models.MarsTerrain2Robot,
			where: { MarsTerrainId: gridId },
			required: true
		}
	})
}

async function retrieveLostRobotsInformationOnGrid(gridId) {
	return await models.Robot.findAndCountAll({
		attributes: ['Id', 'Name', 'LostGridPosition', 'LostGridOrientation', 'LastKnownCommand'],
		include: {
			model: models.MarsTerrain2Robot,
			where: { MarsTerrainId: gridId },
			required: true
		},
		where: { Status: util.LOST_ROBOT_STATUS}
	});
}

module.exports = {
	createRobot,
	updateRobotStatus,
	retrieveLatestRobotAvailable,
	findLostRobotsScent,
	updateLostRobotStatus,
	retrieveLostRobotsInformationOnGrid
}