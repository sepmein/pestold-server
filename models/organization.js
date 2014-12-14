var mongoose = require('mongoose')

var organizationSchema = mongoose.Schema({
	type: {
		type: String,
		enum: ['pco', 'cdc', 'pso'],
		required: true
	},
	name: String,
	juristicPerson: String,
	address: String,
	nameCn: {
		type: String,
		required: true
	},
	juristicPersonCn: String,
	addressCn: String,
	phoneNumber: Number,
	updated: {
		type: Date,
		default: Date.now
	},
	pcoInfo: {
		grade: {
			type: String,
			enum: ['A', 'AA', 'AAA']
		},
		no: {
			type: Number,
			max: 20209999
		},
		validationDate: {
			from: Date,
			to: Date
		},
		presentationDate: Date
	},
	cdcInfo: {
		level: {
			type: String,
			enum: ['municipal', 'district']
		}
	},
	psoInfo: {
		level: {
			type: String,
			enum: ['municipal', 'district']
		}
	}
});

mongoose.model('organization', organizationSchema);