const app = require('./server');
require('dotenv').config();

app.listen(process.env.PORT, async () => {
	console.log(`App running on port ${process.env.PORT}...`);
});


