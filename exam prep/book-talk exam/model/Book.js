const { Schema, model, Types } = require('mongoose');

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: [2, 'Title should be at least 2 characters']
    },
    author: {
        type: String,
        required: true,
        minLength: [5, 'Author should be at least 5 characters']
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: function (val) {
                return /^https?:\/\/.+$/.test(val);
            },
            message: 'Image URL is not valid'
        }
    },
    review: {
        type: String,
        required: true,
        minLength: [10, 'Review should be a minimum of 10 characters long']
    },
    genre: {
        type: String,
        required: true,
        minLength: [3, 'Genre should be at least 3 characters']

    },
    stars: {
        type: Number,
        required: true,
        min: [1, 'Stars should be a positive number between 1 and 5'],
        max: [5, 'Stars should be a positive number between 1 and 5']
    },
    wishList: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

const Book = model('Book', bookSchema);

module.exports = Book;