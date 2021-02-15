'use strict'

const models = require('../models');

async function getSupportedCommands() {
    return await models.Sequelize.findAll();
}

module.exports = {
    getSupportedCommands
}