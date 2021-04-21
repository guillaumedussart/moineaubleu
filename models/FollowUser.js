const {Schema,model} = require('mongoose');

const followUserSchema = new Schema({
	user_id: [{
		type: Schema.Types.ObjectId,
		required:true,
		ref:"User"
	}],
	follower_id: [{
		type: Schema.Types.ObjectId,
		required:true,
		ref:"Chirp"
	}]
});


const FollowUser = model('follows_users', followUserSchema);
module.exports = FollowUser;