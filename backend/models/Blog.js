const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema(
	{
		title: { type: String, required: true },
		url: { type: String, required: true },
		description: { type: String, required: true },
		user: { type: Object },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Blog', blogSchema);
