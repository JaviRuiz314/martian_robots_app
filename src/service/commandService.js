'use strict'

const models = require('../models');

async function getSupportedCommands() {
	return await models.Command.findAll();
}

async function createNewCommand(commandData) {
	return await models.Command.create({
		Name: commandData,
		Movement_changue: commandData.movementChange,
		Direction_change: commandData.directionChange
	});
}

module.exports = {
	getSupportedCommands,
	createNewCommand
}