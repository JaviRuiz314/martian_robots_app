'use strict'

const robotService = require('../service/robotService');

function _validateRobotRequest(name) {
	if (!name) {
		throw 'The request must include the robot name in the body';
	}
	return true;
}
async function createNewRobot(req, res) {
	try {
		if (_validateRobotRequest(req.body.name)) {
			const robot = await robotService.createRobot(req.body.name);
			res.status(200).send('New robot created succesfully with name: ' + robot.dataValues.Name);
		}
	} catch (err) {
		console.log('createNewRobot unexpected error: ' + err.toString());
		res.send(500).send('Unexpected server error: ' + err.toString());
	}
}

module.exports = {
	createNewRobot
}