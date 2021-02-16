'use strict'

const
	models = require('../models'),
	util = require('../shared/util');

class RobotService {

	constructor(name, inPosition) {
		this.name = name,
			this.inPosition = inPosition
	}

	static async createRobot() {
		const latestMarsTerrain = await models.MarsTerrain.findOne({
			order: ['Id', 'DESC'],
		});
		const newRobot = await models.Robot.create({
			Name: this.name,
			Status: util.CREATED_ROBOT_STATUS
		});
		await models.MarsTerrainToRobot.create({
			MarsTerrainId: latestMarsTerrain.dataValues.Id,
			RobotId: newRobot.dataValues.Id
		});
		return newRobot;
	}
	async updateStatus(id, status) {
		await models.Robot.update(
			{ Status: status },
			{
				where: {
					Id: id
				}
			}
		);
	}
}

module.exports = {
	RobotService
}