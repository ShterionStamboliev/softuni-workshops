const mongoose = require('mongoose');

const connect_str = 'mongodb://localhost:27017/soft_booking';

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