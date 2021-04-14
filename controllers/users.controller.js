const User = require('../models/User');
const {findUser, saveUser, updateProfil} = require('../queries/users.queries')

exports.usersPage = (req, res) => {
	User.find().then(users => {
		res.render('users-list', {users});
	}).catch(error => {
		console.error(error);
		res.render('users-list');
	});
}
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
exports.profilPage = (req, res, next) => {
	res.render('pages/profile', {
		title: 'Profile',
		session: req.session,
		url: req.originalUrl
	});
}
exports.logoutProfil = (req, res, next) => {
	//req.logout();
	req.session = null;
	res.redirect('/');
}

/*
*
* post method
*
* */
exports.signUp = async (req, res) => {
	await saveUser(req.body, req, res);
	res.redirect('/users/signin');
	res.end();

}

exports.signIn = async (req, res, next) => {
	await findUser(req, res);
}
exports.updateProfil = async (req, res, next) => {
	await updateProfil(req,res)
}
