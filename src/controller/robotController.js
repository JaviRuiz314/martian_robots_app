'use strict'

const { RobotService } = require('../service/robotService');


async function createNewRobot(req, res) {
	try {
		const robot = await createRobot(req.body.name);
		res.status(200).send('New robot created succesfully with name: ' + robot.dataValues.Name);
	} catch (err) {
		console.log('createNewRobot unexpected error: ' + err.toString());
		res.send(500).send('Server error');
	}
}

module.exports = {
	createNewRobot
}