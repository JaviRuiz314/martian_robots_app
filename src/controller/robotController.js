'use strict'

const 
	robotService = require('../service/robotService'),
	marsTerrainService = require('../service/marsTerrainService')

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
	} catch (error) {
		console.log('createNewRobot | unexpected error: ' + error.toString());
		res.status(500).send('createNewRobot | Unexpected server error: ' + error.toString());
	}
}

async function retrieveLostRobotsInformationOnGrid(req, res) {
	try {
		const 
			gridToSearch = await marsTerrainService.retrieveSelectedGridOrLatest(req.query),
			response = await robotService.retrieveLostRobotsInformationOnGrid(gridToSearch.Id);
		res.status(200).send(`The number of lost robots is ${response.count} and the information of those robots is: ${JSON.stringify(response.rows)}`);
	} catch (error) {
		console.log('retrieveNumberOfLostRobotsOnGrid | createNewRobot unexpected error: ' + error.toString());
		res.status(500).send('retrieveNumberOfLostRobotsOnGrid| Unexpected server error: ' + error.toString());
	}
}

module.exports = {
	createNewRobot,
	retrieveLostRobotsInformationOnGrid	
}