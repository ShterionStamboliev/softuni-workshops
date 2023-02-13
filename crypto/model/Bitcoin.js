const { Schema, model, Types } = require('mongoose');

const bitcoinSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, 'Name must be at least 2 characters long']
    },

    price: {
        type: Number,
        required: true,
        min: [1, 'Price must be positive number']
    },

    image: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^https?:\/\/.+$/.test(value);
            },
            message: 'URL is not valid!'
        }
    },

    description: {
        type: String,
        required: true,
        minLength: [10, 'Description should be a minimum of 10 characters long']
    },

    payment: {
        type: String,
        enum: {
            values: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
            message: 'Invalid payment method'
        },
        required: true
    },

    buyCrypto: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

const Bitcoin = model('Bitcoin', bitcoinSchema);

module.exports = Bitcoin;