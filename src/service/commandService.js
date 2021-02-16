'use strict'

const models = require('../models');

async function getSupportedCommands() {
	return await models.Command.findAll();
}

module.exports = {
	getSupportedCommands
}