const mongoose = require('mongoose');

const followUserSchema = mongoose.Schema({
	user_id: {
		type: Number,
	},
	chirp_id: {
		type: Number,
	},
	user:{type:Shema.Types.ObjectId,ref:"User"},
	chirp:{type:Shema.Types.ObjectId,ref:"Chirp"}
});


const FollowUser = mongoose.model('follows_users', followUserSchema);
module.exports = FollowUser;