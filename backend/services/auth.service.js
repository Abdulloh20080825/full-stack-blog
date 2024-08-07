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
}

module.exports = new AuthService();
