const
    express = require('express'),
    app = express(),
    path = require('path');

app.use(express.static('./dist'));
app.get('/', (req, res) => {
    res.sendFile(path.resolve('./src', 'index.html'));
});

module.exports = app;