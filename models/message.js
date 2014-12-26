var mongoose = require('mongoose'),
	ObjectId = mongoose.Schema.Types.ObjectId;

var messageSchema = mongoose.Schema({
	type: {
		type: String,
		enum: ['audit','normal'],
		required: true
	},
	to: {
		type: ObjectId,
		required: true
	},
	action: String,
	message: String
});

