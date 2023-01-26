const db = require('mongoose');

const url = 'mongodb://localhost:27017/cubes';


async function start() {
    db.set('strictQuery', false);
    await db.connect(url);

    console.log('Db connected...');
};

module.exports = start;