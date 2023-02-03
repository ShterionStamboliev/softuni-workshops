const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    }
});

userSchema.index({ username: 1 }, {
    collation: {
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;