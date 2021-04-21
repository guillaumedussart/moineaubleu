const {encode} = require('jwt-simple');
const moment = require('moment');
const {jwt: {secret}} = require('../environement');


exports.createToken = ({_id, username, email, image}) => {

	const payload = {
		sub: _id,
		username, email, image,
		iat: moment().unix(),
		exp: moment().add(1, 'days').unix()
	};

	return encode(payload, secret);
}
