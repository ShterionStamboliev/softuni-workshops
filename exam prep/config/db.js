const db = require('mongoose');

const CONNECTION_STR = 'mongodb://127.0.0.1:27017/bitcoin';

exports.dbStart = () => {
    db.set('strictQuery', false);
    db.connection.on('open', () => console.log('Db connected'));
    return db.connect(CONNECTION_STR);
}