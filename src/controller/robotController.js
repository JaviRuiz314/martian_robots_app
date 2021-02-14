'use strict'

const { RobotService } = require('../service/robotService');

async function createNewRobot(req, res) {
    try {
        const robot = new RobotService(req.body.name, req.body.inPosition);
        await robot.constructor.createRobot();
        res.status(200).send(robot);
    } catch (err) {
        console.log('createNewRobot unexpected error: ' + err.toString());
        res.send(500).send('Server error');
    }

}

module.exports = {
    createNewRobot
}