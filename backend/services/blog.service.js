const Blog = require('../models/Blog');
const Comment = require('../models/Comment');

class BlogService {
	async create({ url, title, description, user }) {
		try {
			console.log(user);
			const blog = new Blog({ url, title, description, user });
			await blog.save();
			return blog;
		} catch (error) {
			console.error('Error saving blog:', error);
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
			const comments = await Comment.find();
			for (let i = 0; i < comments.length; i++) {
				if (comments[i].blog == blogId) {
					await Comment.findByIdAndDelete(comments[i]._id);
				}
			}

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
		console.log(userId);
		try {
			const blogs = await Blog.find();

			console.log(blogs);
			const userBlog = blogs.filter((blog) => {
				if (blog.user?.user) {
					return blog.user.id == userId;
				}
				return blog.user.id === userId;
			});

			return userBlog;
		} catch (error) {
			throw new Error('Something went wrong with the service');
		}
	}
}

module.exports = new BlogService();
