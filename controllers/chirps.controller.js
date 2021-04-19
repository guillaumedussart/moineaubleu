const Chirp = require('../models/Chirp');
const {
	saveChirp,
	deleteOneChirp
} = require('../queries/chirps.queries');

exports.createChirpPage = (req, res) => {
	let session = req.session;

	res.render('pages/chirp', {
		title: 'Chirp',
		session: session,
		cookie:req.cookies.jwt
	});
}

exports.createChirp = async (req, res) => {
	try {
		await saveChirp(req, res);
		res.redirect('/');
	} catch (e) {
		console.log(e.message);
	}
}

exports.deleteChirp = async (req,res)=>{
	try{
		await deleteOneChirp(req.params.id);
		res.redirect('/');
	}
	catch (e) {

	}
}