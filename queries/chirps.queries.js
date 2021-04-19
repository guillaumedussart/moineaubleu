const Chirp = require('../models/Chirp');


exports.getAllChirps = (req, res) => {
	return Chirp.find().populate('author').exec();
}

exports.getOneChirp = (id) => {
	return Chirp.findOne({_id: id}).exec();

}

exports.updateOneChirp = (req, res) => {
	const chirp = {
		text: req.body.chirp
	}
	Chirp.updateOne({_id:req.body.id_chirp},chirp,{new:true}).exec();
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