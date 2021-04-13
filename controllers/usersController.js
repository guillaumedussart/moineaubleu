const User = require('../models/User');
const {findUser, saveUser} = require('../queries/usersQueries')

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
	let user =
	console.log('login ' + req.session.user);
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
	console.log(req.body)
	await saveUser(req.body, req, res);
	res.redirect('/users/signin');
	res.end();

}

exports.signIn = async (req, res, next) => {
	await findUser(req,res);

}

exports.profilPage = (req, res, next) => {
	console.log(next)
}