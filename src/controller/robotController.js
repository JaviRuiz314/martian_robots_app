'use strict'

const { RobotService } = require('../service/robotService');


function _parseStingIntoIntArray(string) {
	const array = string.split(',');

	for (let i of array) {
		i = parseInt(i);
	}
	return array;
}
async function createNewRobot(req, res) {
	try {
		if (typeof (req.body.inPosition) !== "array") {
			req.body.inPosition = _parseStingIntoIntArray(req.body.inPosition);
		}
		const robot = new RobotService(req.body.name, req.body.inPosition);
		await robot.constructor.createRobot();
		res.status(200);
	} catch (err) {
		console.log('createNewRobot unexpected error: ' + err.toString());
		res.send(500).send('Server error');
	}

}

module.exports = {
	createNewRobot
}