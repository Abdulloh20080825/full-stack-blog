const adminService = require('../services/admin.service');

class AdminController {
	async allUsers(req, res) {
		try {
			const users = await adminService.alllUsers();
			return res.status(200).json({
				message: 'All Users find successfuly',
				users,
			});
		} catch (error) {
			return res.status(500).json({
				message: 'Something went wrong',
			});
		}
	}
	async allBlogs(req, res) {
		try {
			const blogs = await adminService.allBlogs();
			return res.status(200).json(blogs);
		} catch (error) {
			return res.status(500).json({
				message: 'Something went wrong',
			});
		}
	}
}

module.exports = new AdminController();
