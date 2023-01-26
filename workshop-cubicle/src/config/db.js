const db = require('mongoose');
const cfg = require('./config');

async function start() {
    db.set('strictQuery', false);
    await db.connect(cfg.URI);

    console.log('Db connected...');
};

module.exports = start;