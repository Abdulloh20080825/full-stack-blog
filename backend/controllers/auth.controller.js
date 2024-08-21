const authService = require('../services/auth.service');
const generateToken = require('../helpers/createJwtToken');
const smtp = require('../helpers/smtp');

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
			if (username === 'admin' && password === 'admin12345') {
				const user = {
					id: isUserExist.id,
					username: isUserExist.username,
				};
				const accessToken = generateToken(user);
				return res.status(200).json({
					message: 'Admin Login successful',
					accessToken,
					user,
					admin: true,
				});
			}
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
				admin: false,
			});
		} catch (error) {
			return res.status(500).json({
				message: 'Something went wrong',
			});
		}
	}

	async register(req, res) {
		const { name, email, username, password } = req.body;
		try {
			if (!name || !email || !username || !password) {
				return res.status(400).json({
					message: 'All fields are required',
				});
			}
			if (username === 'admin') {
				return res.status(400).json({
					message: 'It is admin login',
				});
			}
			const user = await authService.register({
				name,
				email,
				username,
				password,
			});

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

	async forgotPassword(req, res) {
		try {
			const { email } = req.body;
			if (!email) {
				return res.status(400).json({
					message: 'All fields are required',
				});
			}

			await smtp.sendMail(email);
			return res.status(200).json({
				message: 'Message sended successfuly',
			});
		} catch (error) {
			return res.status(500).json({
				message: 'Something went wrong',
			});
		}
	}

	async getUser(req, res) {
		try {
			const user = req.user;
			const findUser = await authService.findUser(
				user._id ? user._id : user.id
			);
			if (!findUser) {
				return res.status(400).json({
					message: 'User not found',
				});
			}
			if (findUser.username === 'admin') {
				return res.status(200).json({
					message: 'Admin profile find successfuly',
					findUser,
					admin: true,
				});
			}
			return res.status(200).json({
				message: 'User found successfully',
				findUser,
			});
		} catch (error) {
			return res.status(500).json({
				message: 'Something went wrong',
			});
		}
	}

	async changePassword(req, res) {
		try {
			const user = req.user;
			const { newpassword } = req.body;
			const changed = await authService.changePassword(newpassword, user.id);
			if (!changed) {
				return res.status(400).json({ message: 'Error, please try again' });
			}
			return res
				.status(200)
				.json({ message: 'Password changed successfully', changed });
		} catch (error) {
			console.error('Controller error:', error);
			return res.status(500).json({ message: 'Something went wrong' });
		}
	}

	async deleteAccount(req, res) {
		try {
			const user = req.user;
			const deletedUser = await authService.deleteAccount(user._id);
			return res.status(201).json({
				message: 'User deleted successfuly',
				deletedUser,
			});
		} catch (error) {
			console.error('Controller error:', error);
			return res.status(500).json({ message: 'Something went wrong' });
		}
	}

	async getUserInfo(req, res) {
		try {
			const id = req.params.id;
			const user = await authService.getUserInfo(id);
			return res.status(200).json({
				message: 'User info find successfuly',
				user,
			});
		} catch (error) {
			return res.status(500).json({
				message: 'Something went wrong',
			});
		}
	}
}

module.exports = new AuthController();
