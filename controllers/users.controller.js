const User = require('../models/User');
const {getOneUser, saveUser, updateProfil} = require('../queries/users.queries');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const uploadsFolder = path.resolve('public/uploads/');


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
	console.log(userAndChirp)
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

/*
 *
 * post method
 *
 * */
exports.signUp = async (req, res) => {
	try {
		await saveUser(req.body, req, res);
		res.redirect('/users/signin');
	} catch (e) {
		res.render('/users/signup', {
			error: true,
			errors: [e.message]
		});
	}
}

exports.signIn = async (req, res, next) => {
	try {
		await getOneUser(req, res);
	} catch (e) {
		res.render('/users/signin', {
			error: true,
			errors: [e.message]
		});
	}
}

exports.updateProfil = async (req, res, next) => {
	let newFilename;

	try {
		if (req.files) {
			let avatar = req.files.photo;

			let pathUploadFile = uploadsFolder + '/' + req.files.photo.name;
			let ext = path.extname(pathUploadFile);

			avatar.mv(pathUploadFile);

			newFilename = req.body.username + ext;

			sharp(req.files.photo.data)
				.resize(200, 200, {
					fit: sharp.fit.inside,
					withoutEnlargement: true
				})
				.toFormat('jpeg')
				.jpeg({quality: 90})
				.toFile(`${uploadsFolder}/${newFilename}`);


			fs.unlinkSync(pathUploadFile);
		}
		await updateProfil(req, res, newFilename)
	} catch (e) {
		res.render('pages/profile', {
			session: req.session,
			error: true,
			errors: [e.message]
		});
	}
}