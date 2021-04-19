const Chirp = require('../models/Chirp');


exports.getAllChirps = (req, res) => {
	return Chirp.find().populate('author').exec();
}


exports.saveChirp = (req, res) => {
	const insertChirp = new Chirp({
		author: req.user.sub,
		text: req.body.chirp
	});
	return insertChirp.save();
}

exports.deleteOneChirp = (id) => {

	return Chirp.findOneAndDelete(id);

}