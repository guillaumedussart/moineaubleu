const User = require('../models/User');


exports.usersPage = (req, res) => {
	User.find().then(users => {
		console.log(users)
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
		title: "Se connecter"
	});
}
exports.signUpPage = (req, res) => {
	res.render('auth/register');
}

/*
*
* post method
*
* */
exports.signUp = async (req, res) => {

	await saveUser(req.body);
	res.redirect('auth/login');

}

exports.signIn = async (req, res, next) => {
	await findUser(req.body);

}