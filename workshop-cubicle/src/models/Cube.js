const { Schema, model, default: mongoose } = require('mongoose');

const cubeSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true, maxLength: 50 },
    imageUrl: { type: String, required: true },
    difficultyLevel: { type: Number, required: true, min: 1, max: 6 },
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Accessory'
    }]
});

const Cube = model('Cube', cubeSchema);

module.exports = Cube;