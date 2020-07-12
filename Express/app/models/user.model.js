const mongoose = require('mongoose');

require('./location.model.js');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	_id: Schema.Types.ObjectId,
    lastname: {
		type: String,
		required: false,
	},
    firstname: {
		type: String,
		required: false,
	},
	email: {
		type: String,
		required: true,
	},
	// avatar: {
	// 	type: String,
	// 	required: true,
	// },
	// birthdate: {
	// 	type: String,
	// 	required: true,
	// },
	// gender: {
	// 	type: String,
	// 	required: true,
	// },
	// phoneNumber: {
	// 	type: String,
	// 	required: true,
	// },
	sub: {
		type: String,
		required: true,
	},
	userRole:{
		type: String,
		require: true,
	},
}, 
{
    timestamps: true
}
);

module.exports = mongoose.model('user',UserSchema,'users');
