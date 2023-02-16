const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    myAds: [{
        type: Types.ObjectId,
        ref: 'Ad'
    }]
});

const User = model('User', userSchema);

module.exports = User;