const
    app = require('./server'),
    axios = require('axios'),
    prompt = require('prompt');
require('dotenv').config();


async function start() {
    console.log('State your new robot name...');
    prompt.start();
    prompt.get(['name', {
        name: 'inPosition',
        type: 'array'
    }], async function (err, result) {
        console.log('Command-line input received:');
        console.log('  robot name: ' + result.name);
        console.log('  robot initial position: ' + result.inPosition);

        try {
            const newRobot = await axios.post('http://localhost:4200/getnewrobot', {
                name: result.name,
                inPosition: result.inPosition
            });
        } catch (error) {
            console.log('unexpected error: ' + error.toString());
        }
    });

}

app.listen(process.env.PORT, async () => {
    console.log(`App running on port ${process.env.PORT}...`);

    await start();
});


