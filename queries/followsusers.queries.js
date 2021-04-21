const FollowUser = require('../models/FollowUser');


exports.setFollowUser = (body) => {
	const setFollow = new FollowUser({
		user_id: body.iduser,
		follower_id: body.idfollower
	});
	return setFollow.save();
}