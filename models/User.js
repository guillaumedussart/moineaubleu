const { Schema, model } = require('mongoose');
const Chirp = require('../models/Chirp');
const bcrypt = require('bcrypt');
const {
    hashRounds
} = require('../environement');

const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true, "Name is required !"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Username is required !"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Wrong email !"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
    chirps: [{ type: Schema.Types.ObjectId, ref: "Chirp" }],
});

userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, hashRounds);
}

const User = model('User', userSchema);
module.exports = User;