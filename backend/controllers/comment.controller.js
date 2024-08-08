const commentService = require('../services/comment.service');

class CommentController {
	async comment(req, res) {
		try {
			const user = req.user;
			const { comment } = req.body;
			const blogId = req.params.blog;
			const UserComment = await commentService.comment({
				user,
				comment,
				blogId,
			});
			return res.status(200).json(UserComment);
		} catch (error) {
			return res.status(500).json({
				message: 'Error with comment controller',
			});
		}
	}
	async getComment(req, res) {
		try {
			const id = req.params.id;
			const userComment = await commentService.getComment(id);
			return res.status(200).json(userComment);
		} catch (error) {
			return res.status(500).json({
				message: 'Error fetching comments',
			});
		}
	}
}

module.exports = new CommentController();
