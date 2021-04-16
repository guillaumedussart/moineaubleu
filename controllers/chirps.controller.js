const Chirp = require('../models/Chirp');
const {saveChirp} = require('../queries/chirp.queries');

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