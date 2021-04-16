const {decode} = require('jwt-simple');
const {jwt: {secret}} = require('../environement');
const moment = require('moment');

exports.checkAuth = (req, res, next) => {
	const token = req.cookies.jwt;

	if (!token) {
		console.log("access not allowed");
		return res.redirect("/users/signin");
	}
	try {
		const payload = decode(token, secret);
		if (payload && payload.exp <= moment.unix()) {
			console.log('token expired');
			res.redirect('/users/signin');
		} else if (payload) {
			req.user = payload;
			next();
		} else {
			console.log('no valid token')
			res.redirect('/users/signin');

		}
	} catch (e) {
		console.log('unvalid token');
		res.redirect('/users/signin');
	}
}