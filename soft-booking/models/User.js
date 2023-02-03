const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: [3, 'Username must be at least 3 characters long']
    },
    hashPassword: {
        type: String,
        required: true
    }
});

const User = model('User', userSchema);

module.exports = User;