const Blog = require('../models/Blog');
const User = require('../models/User');

class AdminService {
	async alllUsers() {
		try {
			const users = await User.find();
			const usersNotAdmin = users.filter((x) => x.username !== 'admin');
			return usersNotAdmin;
		} catch (error) {
			throw new Error('Somrthing went ewrong with service');
		}
	}

	async allBlogs() {
		try {
			const blogs = await Blog.find();
			console.log(blogs);
			return blogs;
		} catch (error) {
			throw new Error('Somrthing went ewrong with service');
		}
	}
}

module.exports = new AdminService();
