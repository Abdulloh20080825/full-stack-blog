const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema(
	{
		comment: { type: String, required: true },
		blog: { type: Object },
		user: { type: Object },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
