'use strict'

const models = require('../models');
class RobotService {
    constructor(name, inPosition) {
        console.log(name);
        console.log(inPosition);
        return await this.createRobot(name, inPosition);
    }

    getRobotInfo() { }
    async createRobot(name, inPosition) {
        const newRobot = await models.Robot.create({
            Name: name,
            Status: 'ACTIVE'
        });
        newRobot.inPosition = inPosition;
        return newRobot;
    }
    updateStatus(id, status) {
        await models.Robot.update(
          { Status: status},
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