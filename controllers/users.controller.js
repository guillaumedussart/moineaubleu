const User = require('../models/User');



/*
 *
 * page auth return
 * */
exports.signInPage = (req, res) => {
	res.render('auth/login', {
		title: 'Signin'
	});
}
exports.signUpPage = (req, res) => {
	res.render('auth/register', {
		title: 'Signin'
	});
}
exports.profilPage = async (req, res, next) => {
	const username = req.params.username;
	const userAndChirp = await User.find({username}).populate('chirps').exec();
	res.render('pages/profile', {
		title: 'Profile',
		session: req.session,
		url: req.originalUrl,
		chirpsUser: userAndChirp
	});
}
exports.logoutProfil = (req, res, next) => {
	//req.logout();
	res.clearCookie('jwt');
	req.session = null;
	res.redirect('/');
}

