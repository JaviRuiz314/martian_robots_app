'use strict';

const 
	Robot = require('./robotRoutes'),
	ObjectTracker = require('./objectTrackerRoutes'),
	MarsTerrain = require('./marsTerrainRoutes');

module.exports = {
	Robot,
	ObjectTracker,
	MarsTerrain
}