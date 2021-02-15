'use strict'

const commandService = require('../service/commandService');


async function getSupportedCommands() {
	return await commandService.getSupportedCommands();
}

async function getCommandNametoValuesMap() {
	let 
		availableCommads = await commandService.getSupportedCommands(),
		commandNameToValuesName = {};
	for (let command of availableCommads) {
		commandNameToValuesName[command.dataValues.Name] = [command.dataValues.Movement_change, command.dataValues.Direction_change]
	}
	return commandNameToValuesName;
}

module.exports = {
	getSupportedCommands,
	getCommandNametoValuesMap
}