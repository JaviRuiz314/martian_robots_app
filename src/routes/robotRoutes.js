'use strict';

const
    express = require('express'),
    app = express.Router(),
    robotController = require('../controller/robotController');

app.post('/getnewrobot', robotController.createNewRobot);

module.exports = app;