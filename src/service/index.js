'use strict';

const 
	Robot = require('./robotService'),
	ObjectTracker = require('./objectTrackerService'),
	Command = require('./commandService'),
	Movement = require('./movementService'),
	MarsTerrain = require('./marsTerrainService');

module.exports = {
	Robot,
	ObjectTracker,
	Command,
	Movement,
	MarsTerrain
}