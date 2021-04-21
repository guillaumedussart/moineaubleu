const {Schema, model} = require('mongoose');
const Chirp = require('../models/Chirp');
const bcrypt = require('bcrypt');
const {
	hashRounds
} = require('../environement');

const userSchema = new Schema({
	name: {
		type: String,
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
		default: ''
	},
	description: {
		type: String,
	}
}, {
	toJSON: { virtuals: true },
	toObject: { virtuals: true }
});

userSchema.virtual('chirps', {
	ref: 'Chirp',
	localField: '_id',
	foreignField: 'author'
});

userSchema.statics.hashPassword = (password) => {
	return bcrypt.hashSync(password, hashRounds);
}

const User = model('User', userSchema);
module.exports = User;