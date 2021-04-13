const User = require('../models/User');

exports.findAllUsers = () => {
	return User.find().exec();
}

exports.findUserByUsername = (username) => {
	return User.findOne({username}).exec();
}

exports.saveUser = ({user}) => {
	bcrypt.hash(user.password, +process.env.SALT_ROUNDS).then( // + pour convertir en nombre
		(hash) => {
			const user = new User({
				name: user.name,
				email: user.email,
				username: user.username,
				password: hash
			});
			user.save().then(
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

exports.findUser = ({reqUser}) => {
	User.findOne({email: reqUser.email}).then(
		(user) => {
			if (!user) {
				return res.status(401).json({
					error: new Error('User not found!')
				});
			}
			bcrypt.compare(reqUser.password, user.password).then(
				(valid) => {
					if (!valid) {
						return res.status(401).json({
							error: new Error('Incorrect password!')
						});
					}
					res.status(200).json({
						userId: user._id,
						token: 'token'
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
	).catch(
		(error) => {
			res.status(500).json({
				error: error
			});
		}
	);
}