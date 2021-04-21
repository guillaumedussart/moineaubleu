const {saveUser, getOneUser, updateProfil} = require('../queries/users.queries');
const {setFollowUser} = require('../queries/followsusers.queries');
const {validateFile} = require('../services/valid-image.service');


const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const uploadsFolder = path.resolve('public/uploads/');


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
			validateFile(req.files);
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

exports.followUser = async (req, res) => {
	const {body} = req;
	try {
		await setFollowUser(body);
	} catch (e) {

	}
	console.log(req.body)
}