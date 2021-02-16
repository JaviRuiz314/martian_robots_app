const
	express = require('express'),
	app = express(),
	path = require('path'),
	routes = require('./routes'),
	bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ limit: '2mb', extended: false }));
app.use(bodyParser.json());

//app.use(express.static('./index.html'));
//app.get("/", (req, res) => {
//    res.sendFile(path.resolve('./', "index.html"), err => console.log(err));
//});

app.use(routes.Robot);
app.use(routes.ObjectTracker);

module.exports = app;