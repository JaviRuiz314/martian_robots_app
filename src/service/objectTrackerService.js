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

async function _updateRobotCoordinates(coordinates, position, perimeter, robotId) {
	let status = util.ACTIVE_ROBOT_STATUS;
	if (_checkIfRobotIsStillInsideThePerimeter(coordinates, perimeter)) {
		status = util.LOST_ROBOT_STATUS;
		await robotService.updateRobotStatus(robotId, status);
	} else {
		position[0] = coordinates[0];
		position[1] = coordinates[1];
	}

	return [position[0], position[1], status];
}

async function executeCommand(perimeter, robotId, position, movement) {
	let status;
	if (movement.movementModification === 0) { // Change on direction
		position[2] = movementService.changueDirection(position[2], movement.directionModification);
	} else if (movement.directionModification === 0) { // Change on axis
		const newCoordinates = movementService.calculateNewCoordinates(position[0], position[1], position[2], movement.movementModification);
		[position[0], position[1], status] = await _updateRobotCoordinates(newCoordinates, position, perimeter, robotId)
	}
	return [position, status];
}

async function executeStringOfCommands(perimeter, robotId, position, commandString, availableCommadsMap) {
	let status;
	for (const command of commandString) {
		[position, status] = await executeCommand(perimeter, robotId, position, availableCommadsMap[command]);
		if (status === util.LOST_ROBOT_STATUS) {
			break;
		}
		console.log('position');
		console.log(position);
	}
	return [position, status];
}

module.exports = {
	executeCommand,
	executeStringOfCommands
}