'use strict'

const commandService = require('../service/commandService');


async function getSupportedCommands() {
	return await commandService.getSupportedCommands();
}

async function getCommandNametoValuesMap() {
	let 
		availableCommads = await commandService.getSupportedCommands(),
		commandNameToValuesName = {
			movementModification: '',
			directionModification: ''
		};
	for (let command of availableCommads) {
		commandNameToValuesName[command.dataValues.Name] = {
			movementModification: command.dataValues.Movement_change, 
			directionModification: command.dataValues.Direction_change
		};
	}
	return commandNameToValuesName;
}

module.exports = {
	getSupportedCommands,
	getCommandNametoValuesMap
}