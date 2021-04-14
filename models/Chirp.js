const mongoose = require('mongoose');

const chirpSchema = mongoose.Schema({
	text: {
		type: String,
		required: [true, "Text is required !"],
	},
	user_id: {
		type: Number,
	},
	like: {
		type: Number,
	}
});



const Chirp = mongoose.model('chirps', userSchema);
module.exports = Chirp;