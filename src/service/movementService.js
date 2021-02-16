'use strict'

const direction2AngleMap = {
	"E": 0,
	"N": 90,
	"W": 180,
	"S": 270
};

function dTrig(trigFunc, angle) {
	return trigFunc(angle * Math.PI / 180);
}

function _normalizeAngle(angle) {
	angle = angle % 360;
	angle = (angle + 360) % 360;
	return angle;
}

function changueDirection(direction, directionModification) {
	let newAngle = _normalizeAngle(direction2AngleMap[direction] + directionModification);
	return Object.keys(direction2AngleMap).find(key => direction2AngleMap[key] === newAngle);
}

function changeCoordinates(xCoordinate, yCoordinate, direction, movementModification) {
	xCoordinate = Math.round(xCoordinate + dTrig(Math.cos, direction2AngleMap[direction]) * movementModification);
	yCoordinate = Math.round(yCoordinate + dTrig(Math.sin, direction2AngleMap[direction]) * movementModification);

	return [xCoordinate, yCoordinate];
}

module.exports = {
	changueDirection,
	changeCoordinates
}