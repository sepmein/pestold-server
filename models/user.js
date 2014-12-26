var mongoose = require('mongoose'),
	ObjectId = mongoose.Schema.Types.ObjectId;

var userSchema = mongoose.Schema({
	userName: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	token: String,
	createdAt: {
		type: Date,
		default: Date.now
	},
	isPro: {
		type: Boolean,
		required: true
	},
	organization: ObjectId,
	administrativeRanking: {
		type: String,
		enum: ['无', '科员', '办事员', '科', '副科', '处', '副处', '局', '副局', '部', '副部']
	},
	department: {
		type: String
	},
	jobTitle: {
		type: String
	},
	approvedBy: ObjectId,
	approved: Boolean,
	pcoUserInfo: {
		operationRank: {
			type: String,
			enum: ['无', '初', '中', '高']
		}
	},
	systemAdmin: Boolean
});

userSchema.statics.findByToken = function*(token) {
	var user =
		yield this.findOne({
			token: token
		}).exec();

	if (!user) {
		return false;
	} else {
		return user;
	}
}

var User = mongoose.model('User', userSchema);