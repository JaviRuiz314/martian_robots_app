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
		const newRobot = await models.Robot.create({
			Name: this.name,
			Status: util.CREATED_ROBOT_STATUS
		});
		newRobot.inPosition = this.inPosition;
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