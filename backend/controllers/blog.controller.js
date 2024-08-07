const blogService = require('../services/blog.service');

class BlogController {
	async create(req, res) {
		try {
			const { url, title, description } = req.body;
			const user = req.user;
			if (!url || !title || !description) {
				return res.status(400).json({
					message: 'All fields are required',
				});
			}
			const blog = await blogService.create({ url, title, description, user });

			return res.status(200).json({
				message: 'Blog created successfully',
				blog,
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				message: 'Something went wrong',
			});
		}
	}

	async view(req, res) {
		try {
			const blogId = req.params.id;
			const blog = await blogService.view(blogId);
			return res.status(200).json(blog);
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				message: 'Something went wrong',
			});
		}
	}

	async edit(req, res) {
		try {
			const blogId = req.params.id;
			const updateData = req.body;
			const blog = await blogService.edit(blogId, updateData);
			return res.status(200).json({
				message: 'Blog updated successfully',
				blog,
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				message: 'Something went wrong',
			});
		}
	}

	async delete(req, res) {
		try {
			const blogId = req.params.id;
			await blogService.delete(blogId);
			return res.status(200).json({
				message: 'Blog deleted successfully',
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				message: 'Something went wrong',
			});
		}
	}

	async getAll(req, res) {
		try {
			const blogs = await blogService.getAll();
			return res.status(200).json(blogs);
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				message: 'Something went wrong',
			});
		}
	}

	async getMy(req, res) {
		try {
			const userId = req.user.user._id;
			console.log(userId);
			const blogs = await blogService.getMy(userId);
			return res.status(200).json(blogs);
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				message: 'Something went wrong',
			});
		}
	}
}

module.exports = new BlogController();
