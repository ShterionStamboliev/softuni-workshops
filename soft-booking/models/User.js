const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9]+$/i, 'Username may contain only english letters and number']
    },
    hashPassword: {
        type: String,
        required: true
    },
});

const User = model('User', userSchema);

module.exports = User;