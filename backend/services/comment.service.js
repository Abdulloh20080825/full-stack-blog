const Comment = require('../models/Comment');
const Blog = require('../models/Blog');

class CommentService {
	async comment({ comment, user, blogId }) {
		try {
			const { _id } = await Blog.findById(blogId);
			const commentUser = new Comment({
				comment: comment,
				blog: _id,
				user,
			});
			await commentUser.save();
			return commentUser;
		} catch (error) {
			throw new Error('Error in comment service');
		}
	}
	async getComment(blogId) {
		blogId;
		try {
			const comments = await Comment.find();

			const filterComment = comments.filter((x) => x.blog == blogId);
			return filterComment;
		} catch (error) {
			console.error('Error in getComment service:', error.message);
			throw new Error('Error fetching comments');
		}
	}
	async delete(id) {
		try {
			return await Comment.findByIdAndDelete(id);
		} catch (error) {
			throw new Error('Error fetching comments');
		}
	}
}

module.exports = new CommentService();
