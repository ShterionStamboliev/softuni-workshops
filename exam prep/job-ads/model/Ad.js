const { Schema, model, Types } = require('mongoose');

const adSchema = new Schema({
    headline: {
        type: String,
        required: true,
        minLength: [4, 'Headline should be a minimum of 4 characters long']
    },
    location: {
        type: String,
        required: true,
        minLength: [8, 'Location should be a minimum of 8 characters long']
    },
    company: {
        type: String,
        required: true,
        minLength: [3, 'Company name should be at least 3 characters']
    },
    description: {
        type: String,
        required: true,
        maxLength: [40, 'Company description should be a maximum of 40 characters long']
    },
    author: {
        type: Types.ObjectId,
        ref: 'User'
    },
    applied: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
});

const Ad = model('Ad', adSchema);

module.exports = Ad;