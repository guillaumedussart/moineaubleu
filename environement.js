const {resolve} = require('path');

module.exports = {
	db:{
		protocol: 'mongodb+srv',
		host:'cluster0.vz1dz.mongodb.net',
		options:'retryWrites=true&w=majority',
		name:'myFirstDatabase',
		user:'gustavo',
		password:'Ha210709'
	},
	hashRounds:11,
	ssl:{
		cert: resolve('ssl','chirps.crt'),
		key: resolve('ssl','chirps.key')
	},
	ports:{
		http:8088,
		https:4443
	}
}