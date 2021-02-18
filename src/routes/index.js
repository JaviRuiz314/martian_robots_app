'use strict';

const 
	Robot = require('./robotRoutes'),
	ObjectTracker = require('./objectTrackerRoutes'),
	MarsTerrain = require('./marsTerrainRoutes'),
	Command = require('./commandRoutes');

module.exports = {
	Robot,
	ObjectTracker,
	MarsTerrain,
	Command
}