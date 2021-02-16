'use strict'

const util = require('../shared/util');

function dTrig(trigFunc, angle) {
	return trigFunc(angle * Math.PI / 180);
}

function _normalizeAngle(angle) {
	angle = angle % 360;
	angle = (angle + 360) % 360;
	return angle;
}

function changueDirection(direction, directionModification) {
	let newAngle = _normalizeAngle(util.DIRECTION2ANGLE_MAP[direction] + directionModification);
	return Object.keys(util.DIRECTION2ANGLE_MAP).find(key => util.DIRECTION2ANGLE_MAP[key] === newAngle);
}

function calculateNewCoordinates(xCoordinate, yCoordinate, direction, movementModification) {
	xCoordinate = Math.round(xCoordinate + dTrig(Math.cos, util.DIRECTION2ANGLE_MAP[direction]) * movementModification);
	yCoordinate = Math.round(yCoordinate + dTrig(Math.sin, util.DIRECTION2ANGLE_MAP[direction]) * movementModification);

	return [xCoordinate, yCoordinate];
}

module.exports = {
	changueDirection,
	calculateNewCoordinates
}