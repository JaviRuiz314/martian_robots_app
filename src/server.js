const
    express = require('express'),
    app = express(),
    path = require('path'),
	bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ limit: '2mb', extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./src', 'index.html'));
});

module.exports = app;