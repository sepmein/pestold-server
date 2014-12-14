var mongoose = require('mongoose'),
ObjectId = mongoose.Schema.Types.ObjectId;

var userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	token: String,
	createdAt: Date,
	isPro: Boolean,
	approvedBy: ObjectId,
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
	}
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