const {Schema, model} = require('mongoose');
const User = require('../models/User')
const chirpSchema = new Schema({
	text: {
		type: String,
		required: [true, "Text is required !"],
	},
	like: {
		type: Number,
		default:0
	},
	author: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	}
});


const Chirp = model('Chirp', chirpSchema);
module.exports = Chirp;