const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema(
	{
		desribtion: { type: String, required: true },
		user_id: { type: String, required: true, unique: true },
		user: { type: Schema.Types.ObjectId, ref: 'User' },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
