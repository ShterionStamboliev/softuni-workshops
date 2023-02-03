const express = require('express');
const expressConfig = require('./config/express');
const dbConfig = require('./config/db');
const routesConfig = require('./config/routes');

start();

async function start() {
    const app = express();

    expressConfig(app);
    await dbConfig(app);
    routesConfig(app);

    app.listen(3000, () => console.log('Database running on port 3000'));
};