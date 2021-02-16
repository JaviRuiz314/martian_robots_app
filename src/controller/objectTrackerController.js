'use strict'

const
	commandController = require('./commadController'),
	objectTrackerService = require('../service/objectTrackerService');

function _verifyInitialPositionFormat(inPosition) {
	if (inPosition.length !== 3) {
		throw 'The initial position must be an string of two integers and one character';
	} else if (typeof (inPosition[0]) !== "number" || typeof (inPosition[1]) !== "number") {
		throw 'The coordinates of the initial position are not integers';
	} else if (typeof (inPosition[2]) !== "string" || !inPosition[2].match(/([N||W||E||S])/)) {
		throw 'The direction of the initial position is not valid';
	}
	return true;
}

function _verifyCommandString(commandString) {
	if (typeof (commandString) !== "string") {
		throw 'The instruction must be a string';
	} else if (commandString.length > 50) {
		throw 'The instruction string can\'t exceed 50 characters';
	} else if (!commandString.match(/([FLR])*/)) {
		console.log(commandString);
		throw 'The instruction string contains commands that are not supported';
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
			position = _parseInitialPosition(req.query.inPosition),
			status;
		const
			availableCommadsMap = await commandController.getCommandNametoValuesMap(),
			areInstructionsValid = (_verifyInitialPositionFormat(position) && _verifyCommandString(req.query.commandString));
		if (areInstructionsValid) {
			for (const command of req.query.commandString) {
				[position, status] = objectTrackerService.executeCommand(position, availableCommadsMap[command]);
			}
		}
		res.status(200).send([position, status]);
	} catch (error) {
		console.log('receiveInstruction: unexpected error: ' + error.toString());
		res.status(503).send('Unexpected error');
	}
}

module.exports = {
	receiveInstructions
}