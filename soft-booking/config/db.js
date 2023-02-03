const mongoose = require('mongoose');

const connect_str = 'mongodb://127.0.0.1:27017/softBooking';

mongoose.set('strictQuery', false);

module.exports = async (app) => {
    try {
        mongoose.connect(connect_str, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected');

    } catch(err) {
        console.error(err.message);
        process.exit(1);
    }
};