const User = require('../models/User');
const bcrypt = require('bcrypt');


exports.findAllUsers = () => {
	return User.find().exec();
}

exports.findUserByUsername = (username) => {

	return User.findOne({username}).exec();
}

exports.saveUser = (user, req, res) => {
	console.log(user)
	bcrypt.hash(user.password, +process.env.SALT_ROUNDS).then( // + pour convertir en nombre
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
	);
}

exports.findUser = (req,res) => {
	User.findOne({email: req.body.email}).then(
		(user) => {
			if (!user) {
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
						email: user.email,
						username: user.username
					}
					/*res.status(200).json({
						userId: user._id,
						token: 'token'
					});*/
					res.redirect('/');
					res.end();
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