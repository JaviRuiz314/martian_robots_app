'use strict'

const commandService = require('../service/commandService');


async function getSupportedCommands() {
    return await commandService.getSupportedCommands();
}

module.exports = {
    getSupportedCommands
}