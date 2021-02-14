'use strict'

const models = require('../models');
class RobotService {

    constructor(name, inPosition) {
        this.name = name,
        this.inPosition = inPosition
    }

    static async createRobot () {
        const newRobot = await models.Robot.create({
            Name: this.name,
            Status: 'ACTIVE'
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