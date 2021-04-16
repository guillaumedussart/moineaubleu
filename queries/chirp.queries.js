const Chirp = require('../models/Chirp');


exports.saveChirp = (req,res)=>{
	console.log(req.user)
	const insertChirp = new Chirp({
		author: req.user.sub,
		text: req.body.chirp
	});
	return insertChirp.save();
}