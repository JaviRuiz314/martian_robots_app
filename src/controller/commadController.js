'use strict'

const commandService = require('../service/commandService');

function _validateCommandBody(commandData) {
	if (typeof (commandData.name) !== "string" || commandData.name.length !== 1) {
		throw "The name of the command must be a single character";
	} else if (typeof (commandData.movementChange) !== "number") {
		throw "The movement value around the axies must be an integer";
	} else if (typeof (commandData.directionChange) !== "number" || commandData.directionChange % 90 !== 0) {
		throw "Direction angle change must be an integer multiple of 90";
	}

	return true;
}

async function getSupportedCommands() {
	return await commandService.getSupportedCommands();
}

async function getCommandNametoValuesMap() {
	let
		availableCommads = await commandService.getSupportedCommands(),
		commandNameToValuesName = {};

	for (let command of availableCommads) {
		commandNameToValuesName[command.dataValues.Name] = {
			movementModification: command.dataValues.Movement_change,
			directionModification: command.dataValues.Direction_change
		};
	}
	return commandNameToValuesName;
}

async function createNewCommand(req, res) {
	try {
		if (_validateCommandBody(req.body)) {
			const newCommand = await commandService.createNewCommand(req.body);
			res.status(200).send('New command created: ' + newCommand.dataValues);
		}
	} catch (error) {
		console.log("createNewCommand | Unexpected error: " + error);
		res.status(500).send("createNewCommand | Unexpected error: " + error.toString());
	}

}

module.exports = {
	getSupportedCommands,
	getCommandNametoValuesMap,
	createNewCommand
}