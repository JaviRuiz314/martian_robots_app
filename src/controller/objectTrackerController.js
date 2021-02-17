'use strict'

const
	commandController = require('./commadController'),
	marsTerrainService = require('../service/marsTerrainService'),
	robotService = require('../service/robotService'),
	objectTrackerService = require('../service/objectTrackerService'),
	util = require('../shared/util')

function _verifyInitialPositionFormat(inPosition) {
	if (inPosition.length !== 3) {
		throw 'The initial position must be an string of two integers and one character';
	} else if (typeof (inPosition[0]) !== "number" || typeof (inPosition[1]) !== "number") {
		throw 'The coordinates of the initial position are not integers';
	} else if (typeof (inPosition[2]) !== "string" || !inPosition[2].match(util.CARDINAL_POINTS_REGEX)) {
		throw 'The direction of the initial position is not valid';
	}
	return true;
}

function _verifyCommandString(commandString) {
	if (typeof (commandString) !== "string") {
		throw 'The instruction must be a string';
	} else if (commandString.length > 50) {
		throw 'The instruction string can\'t exceed 50 characters';
	} else if (!commandString.match(util.AVAILABLE_ORDERS_REGEX)) {
		console.log(commandString);
		throw 'The instruction string contains commands that are not supported';
	}
	return true;
}

function _verifyNeededObjects(marsTerrain, robot) {
	if (!marsTerrain) {
		throw 'No valid grid available, please create one first';
	} else if (!robot) {
		throw 'No valid robot available for this grid, please create one first';
	}

	return true;
}

function _parseInitialPosition(intialPositionAsString) {
	const intialPositionAsArray = [];
	for (let char of intialPositionAsString) {
		intialPositionAsArray.push(isNaN(parseInt(char)) ? char : parseInt(char));
	}
	return intialPositionAsArray;
}

async function receiveInstructions(req, res) {
	try {
		let
			response,
			status,
			position = _parseInitialPosition(req.query.inPosition),

		const
			availableCommadsMap = await commandController.getCommandNametoValuesMap(),
			latestMarsTerrain = await marsTerrainService.retrieveLatestMarsTerrain(),
			latestRobotAvailable = await robotService.retrieveLatestRobotAvailable(),
			areInstructionsValid = (_verifyInitialPositionFormat(position) && _verifyCommandString(req.query.commandString)),
			areRequiredObjectsValid = (_verifyNeededOBjects(latestMarsTerrain.dataValues, latestRobotAvailable.dataValues));
		if (areInstructionsValid && areRequiredObjectsValid) {
			[position, status] = await objectTrackerService.executeStringOfCommands(latestMarsTerrain.dataValues, latestRobotAvailable.dataValues.Id, position, req.query.commandString, availableCommadsMap);
			response = status === util.LOST_ROBOT_STATUS ? { position, status } : position
		}
		res.status(200).send(response);
	} catch (error) {
		console.log('receiveInstruction: unexpected error: ' + error.toString());
		res.status(503).send('Unexpected error');
	}
}

module.exports = {
	receiveInstructions
}