const Blog = require('../models/Blog');

class BlogService {
	async create({ url, title, description, user }) {
		try {
			const blog = new Blog({
				url,
				title,
				description,
				user,
			});
			await blog.save();
			return blog;
		} catch (error) {
			throw new Error('Something went wrong with the service');
		}
	}

	async view(blogId) {
		try {
			const blog = await Blog.findById(blogId);
			if (!blog) {
				throw new Error('Blog not found');
			}
			return blog;
		} catch (error) {
			throw new Error('Something went wrong with the service');
		}
	}

	async edit(blogId, updateData) {
		try {
			const blog = await Blog.findByIdAndUpdate(blogId, updateData, {
				new: true,
			});
			if (!blog) {
				throw new Error('Blog not found');
			}
			return blog;
		} catch (error) {
			throw new Error('Something went wrong with the service');
		}
	}

	async delete(blogId) {
		try {
			const blog = await Blog.findByIdAndDelete(blogId);
			if (!blog) {
				throw new Error('Blog not found');
			}
			return blog;
		} catch (error) {
			throw new Error('Something went wrong with the service');
		}
	}

	async getAll() {
		try {
			const blogs = await Blog.find();
			return blogs;
		} catch (error) {
			throw new Error('Something went wrong with the service');
		}
	}

	async getMy(userId) {
		try {
			const blogs = await Blog.find();
			const userBlog = blogs.filter((x) => x.user.user._id == userId);
			return userBlog;
		} catch (error) {
			throw new Error('Something went wrong with the service');
		}
	}
}

module.exports = new BlogService();
