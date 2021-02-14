const
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    routes = require('./routes/index'),
    path = require('path');

app.use(bodyParser.json({limit: '2mb'}));
app.use(bodyParser.urlencoded({limit: '2mb', extended: false}));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.sendFile(path.resolve('./src/client', 'index.html'));
});

app.use(routes.Robot);

module.exports = app;