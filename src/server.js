const
	express = require('express'),
	app = express(),
	marked = require('marked'),
	routes = require('./routes'),
	fs = require('fs'),
	bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ limit: '2mb', extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
	let
		path = './README.md',
		file = fs.readFileSync(path, 'utf8');
	res.send(marked(file.toString()));
});

app.use(routes.Robot);
app.use(routes.ObjectTracker);
app.use(routes.MarsTerrain);
app.use(routes.Command);

module.exports = app;