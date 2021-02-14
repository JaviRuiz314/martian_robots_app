'use strict';

const
    express = require('express'),
    app = express.Router(),
    robotController = require('../controller/robotController');

app.post('/getnewrobot', async (req, res) => {
    await robotController.createNewRobot(req, res);
    res.redirect('/');
});

module.exports = app;