const Chirp = require('../models/Chirp');


exports.saveChirp = (req,res)=>{
	const insertChirp = new Chirp({
		user: req.session.user.id,
		text: req.body.chirp
	});
	return insertChirp.save();
}