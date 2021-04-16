const User = require('../models/User');
const bcrypt = require('bcrypt');
//const helpers = require('../helpers/imagefilter.helper');
//const multer = require("multer");


exports.findAllUsers = () => {
	return User.find().exec();
}

exports.findUserByUsername = (username) => {

	return User.findOne({username}).exec();
}

exports.saveUser = (user, req, res) => {
	const passHash = User.hashPassword(user.password);
	const insertUser = new User({
		email: user.email,
		username: user.username,
		password: passHash
	});
	return insertUser.save();
	/*bcrypt.hash(user.password, +process.env.SALT_ROUNDS).then(
		(hash) => {
			const usersave = new User({
				email: user.email,
				username: user.username,
				password: hash
			});
			usersave.save().then(
				() => {

					res.status(201).json({
						message: 'User added successfully!'
					});
				}
			).catch(
				(error) => {
					res.status(500).json({
						error: error
					});
				}
			);
		}
	);*/
}

exports.findUser = (req, res) => {
	User.findOne({email: req.body.email}).then(
		(user) => {
			if (!user) {
				delete user.password
				return res.status(401).json({
					error: new Error('User not found!')
				});
			}
			bcrypt.compare(req.body.password, user.password).then(
				(valid) => {
					if (!valid) {
						return res.status(401).json({
							error: new Error('Incorrect password!')
						});
					}
					req.session.user = {
						id: user._id,
						name: user.name,
						email: user.email,
						username: user.username,
						image: user.image
					}
					/*res.status(200).json({
						userId: user._id,
						token: 'token'
					});*/
					res.redirect('/');
				}
			).catch(
				(error) => {
					res.status(500).json({
						error: error
					});
				}
			);
		}
	).catch(
		(error) => {
			res.status(500).json({
				error: error
			});
		}
	);
}

exports.updateProfil = (req, res, img) => {


	User.findOne({_id: req.body.id}).then(
		(user) => {
			if (!user) {
				return res.status(401).json({
					error: new Error('User not found!')
				});
			}
			const updateUser = {};
			updateUser.id = req.body.id;

			if (img) {
				updateUser.image = "/static/uploads/" + img;
			}
			if (req.body.name) {
				updateUser.name = req.body.name;
			}
			if (req.body.username) {
				updateUser.username = req.body.username;
			}

			if (req.body.email) {
				updateUser.email = req.body.email;
			}

			if (req.body.password) {
				updateUser.password = User.hashPassword(req.body.password);
			}
			if (req.body.description) {
				updateUser.description = req.body.description;
			}


			User.updateOne({_id: req.body.id}, updateUser, {new: true}).then(
				() => {
					req.session.user.image = "/static/uploads/" + img;
					req.session.user.name = req.body.name;
					req.session.user.username = req.body.username;
					req.session.user.email = req.body.email;
					req.session.user.description = req.body.description;
					res.status(201).json({
						message: 'Thing updated successfully!'
					});
				}
			).catch(
				(error) => {
					res.status(400).json({
						error: error
					});
				}
			);
		}
	)
}