const User = require('../models/User');

class AuthService {
	async login(username) {
		try {
			const user = await User.findOne({ username });
			return user || null;
		} catch (error) {
			throw new Error('Error finding user');
		}
	}
	zz;
	async register({ name, username, password }) {
		try {
			const isUser = await User.findOne({ username });
			if (isUser) {
				return { error: 'Username already exists' };
			}
			const user = new User({
				name,
				username,
				password,
			});
			await user.save();
			return user;
		} catch (error) {
			return { error: 'Something went wrong with the service' };
		}
	}

	async findUser(id) {
		try {
			return await User.findOne({ _id: id });
		} catch (error) {
			return res.status(500).json({
				message: 'something went wrong with serice',
			});
		}
	}

	async changePassword(password, id) {
		try {
			const changeuserPass = await User.findByIdAndUpdate(
				id,
				{ password: password },
				{ new: true }
			);
			if (!changeuserPass) {
				throw new Error('User not found');
			}
			return changeuserPass;
		} catch (error) {
			console.error('Service error:', error);
			throw new Error('Something went wrong with the service');
		}
	}
}
1;
module.exports = new AuthService();
