const {encode}  = require('jwt-simple');
const moment = require('moment');
const { jwt: { secret }} = require('../environement');



exports.createToken = ({_id,username,email,image,follows}) =>{

	const payload  = {
		sub:_id,
		username,email,image,
		iat:moment().unix(),
		exp: moment().add(30, 'days').unix()
	};
	return encode(payload,secret)

}
