const { Schema, model } = require('mongoose');
const User = require('../models/User');

const chirpSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, "Text is required !"],
    },
    like: {
        type: Number,
    },
});



const Chirp = model('Chirp', chirpSchema);
module.exports = Chirp;