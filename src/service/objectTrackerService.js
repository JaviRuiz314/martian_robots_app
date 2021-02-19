'use strict'

const
	robotService = require('./robotService'),
	movementService = require('./movementService'),
	util = require('../shared/util');


function _checkIfRobotIsStillInsideThePerimeter(coordinates, perimeter) {
	const isTheRobotOutsideThePerimeter = (
		coordinates[0] < 0 ||
		coordinates[1] < 0 ||
		coordinates[0] > perimeter.Dimension_X ||
		coordinates[1] > perimeter.Dimension_Y
	);
	return isTheRobotOutsideThePerimeter;
}

async function _updateRobotCoordinates(coordinates, position, perimeter, robotId, command) {
	let status = util.ACTIVE_ROBOT_STATUS;
	if (_checkIfRobotIsStillInsideThePerimeter(coordinates, perimeter)) {
		status = util.LOST_ROBOT_STATUS;
		await robotService.updateLostRobotStatus(robotId, position, command);
	} else {
		position[0] = coordinates[0];
		position[1] = coordinates[1];
	}

	return [position[0], position[1], status];
}

async function _checkLostRobotsScent(robotPosition, perimeter, command) {
	let hasNotRobotScent = true;
	if (robotPosition[0] === perimeter.Dimension_X || robotPosition[1] === perimeter.Dimension_Y) {
		const lostRobotScent = await robotService.findLostRobotsScent(robotPosition, command, perimeter.Id);
		hasNotRobotScent = lostRobotScent.length == 0;
	}
	return hasNotRobotScent;
}

async function executeCommand(perimeter, robotId, position, availableCommadsMap, command) {
	let
		status,
		movement = availableCommadsMap[command];
	if (movement.movementModification === 0) { // Change on direction
		position[2] = movementService.changueDirection(position[2], movement.directionModification);
	} else if (movement.directionModification === 0) { // Change on axis
		if (await _checkLostRobotsScent(position, perimeter, command)) {
			const newCoordinates = movementService.calculateNewCoordinates(position[0], position[1], position[2], movement.movementModification);
			[position[0], position[1], status] = await _updateRobotCoordinates(newCoordinates, position, perimeter, robotId, command)
		}

	}
	return [position, status];
}

async function executeStringOfCommands(perimeter, robotId, position, commandString, availableCommadsMap) {
	let status;
	for (const command of commandString) {
		[position, status] = await executeCommand(perimeter, robotId, position, availableCommadsMap, command);
		if (status === util.LOST_ROBOT_STATUS) {
			break;
		}
	}
	return [position, status];
}

module.exports = {
	executeStringOfCommands
}