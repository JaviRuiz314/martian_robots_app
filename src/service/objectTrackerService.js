'use strict'

const movementService = require('./movementService');

function executeCommand(position, movement) {
    if (movement.movementModification === 0) { // Change on direction
        position[2] = movementService.changueDirection(position[2], movement.directionModification);
    } else if (movement.directionModification === 0) { // Change on axis
        [position[0], position[1]] = movementService.changeCoordinates(position[0], position[1], position[2], movement.movementModification);
    }

    return [position, 'clear'];
}

module.exports = {
    executeCommand
}