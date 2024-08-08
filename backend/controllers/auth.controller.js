const authService = require('../services/auth.service');
const generateToken = require('../helpers/createJwtToken');

class AuthController {
	async login(req, res) {
		const { username, password } = req.body;
		try {
			if (!username || !password) {
				return res.status(400).json({
					message: 'All fields are required',
				});
			}
			const isUserExist = await authService.login(username);
			if (!isUserExist) {
				return res.status(400).json({
					message: 'User not found',
				});
			}
			if (isUserExist.password !== password) {
				return res.status(400).json({
					message: 'Invalid password',
				});
			}
			const user = {
				id: isUserExist.id,
				username: isUserExist.username,
			};
			const accessToken = generateToken(user);
			return res.status(200).json({
				message: 'Login successful',
				accessToken,
				user,
			});
		} catch (error) {
			return res.status(500).json({
				message: 'Something went wrong',
			});
		}
	}

	async register(req, res) {
		const { name, username, password } = req.body;
		try {
			if (!name || !username || !password) {
				return res.status(400).json({
					message: 'All fields are required',
				});
			}

			const user = await authService.register({ name, username, password });

			if (user.error) {
				return res.status(400).json({
					message: user.error,
				});
			}

			const plainUserObject = user.toObject();

			const accessToken = generateToken(plainUserObject);

			return res.json({
				message: 'User added successfully',
				user: plainUserObject,
				accessToken,
			});
		} catch (error) {
			console.error('Error creating user:', error);
			return res.status(500).json({
				message: 'An error occurred while creating the user',
			});
		}
	}
	async getUser(req, res) {
		try {
			const user = req.user;
			const findUser = authService.findUser(user._id);
			if (!user) {
				return res.status(400).json({
					message: 'User not found',
				});
			}
			return res.status(200).json({
				message: 'User found successfully',
				user,
			});
		} catch (error) {
			return res.status(400).json({
				message: 'Something went wrong',
			});
		}
	}
}

module.exports = new AuthController();
