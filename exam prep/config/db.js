const db = require('mongoose');

const CONNECTION_STR = 'mongodb://127.0.0.1:27017/bitcoin';

async function start() {
    db.connect(CONNECTION_STR);
}

module.exports = start;