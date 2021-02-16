'use strict';

const 
	Robot = require('./robotService'),
	ObjectTracker = require('./objectTrackerService'),
	Command = require('./commandService'),
	Movement = require('./movementService');

module.exports = {
	Robot,
	ObjectTracker,
	Command,
	Movement
}