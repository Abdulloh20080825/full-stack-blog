const express = require('express');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const Blog = require('./models/Blog');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { authenticateToken } = require('./middleware/isAuth');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 4040;

app.use(
	cors({
		origin: '*',
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('hello');
});

app.post('/login', async (req, res) => {
	const { username, password } = req.body;
	try {
		if (!username || !password) {
			return res.status(400).json({
				message: 'All fields are required',
			});
		}
		const isUserExist = await User.findOne({ username });
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
			user: isUserExist,
		};

		const accessToken = jwt.sign(user, 'secreeet', {
			expiresIn: '1d',
		});
		return res.status(201).json({
			message: 'Login successful',
			accessToken,
			user,
		});
	} catch (error) {
		return res.status(500).json({
			message: 'Something went wrong',
		});
	}
});

app.post('/create-account', async (req, res) => {
	const { name, username, password } = req.body;
	try {
		if (!name || !username || !password) {
			return res.status(400).json({
				message: 'All fields are required',
			});
		}

		const isUser = await User.findOne({ username });

		if (isUser) {
			return res.status(400).json({
				error: true,
				message: 'Username already exists',
			});
		}

		const user = new User({
			name,
			username,
			password,
		});
		await user.save();

		const accessToken = jwt.sign({ user }, 'secreeet', {
			expiresIn: '1d',
		});

		return res.json({
			message: 'User added successfully',
			user,
			accessToken,
		});
	} catch (error) {
		console.error('Error creating user:', error);
		return res.status(500).json({
			message: 'An error occurred while creating the user',
		});
	}
});

app.get('/get-user', authenticateToken, (req, res) => {
	try {
		const user = req.user;
		if (!user) {
			return res.status(400).json({
				message: 'User not found',
			});
		}
		return res.status(200).json({
			message: 'User found successfully',
			user,
		});
	} catch (error) {}
});

app.post('/create-blog', authenticateToken, async (req, res) => {
	try {
		const { url, title, description } = req.body;
		const { user } = req.user;
		console.log(user);
		if (!url || !title || !description) {
			return res.status(400).json({
				message: 'All fields are required',
			});
		}

		const blog = await Blog.create({ ...req.body, user: { user } });
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
});

app.get('/view-blog/:id', authenticateToken, async (req, res) => {
	const id = req.params.id;
	try {
		const blog = await Blog.findById(id);
		if (!blog) {
			return res.status(500).json({
				message: 'Blog not found',
			});
		}
		return res.status(200).json({
			message: 'Blog found successfully',
			blog,
		});
	} catch (error) {
		return res.status(500).json({
			message: 'Something went wrong',
		});
	}
});

app.put('/update-blog/:id', authenticateToken, async (req, res) => {
	const id = req.params.id;
	const { url, title, description } = req.body;
	console.log(id);
	try {
		const updatedBlog = await Blog.findByIdAndUpdate(
			id,
			{ url, title, description },
			{ new: true }
		);
		if (!updatedBlog) {
			return res.status(400).json({
				message: 'Error updating blog',
			});
		}
		return res.status(200).json({
			message: 'Update successful',
			updatedBlog,
		});
	} catch (error) {
		return res.status(500).json({
			message: 'Something went wrong',
			error: error,
		});
	}
});

app.delete('/delete-blog/:id', authenticateToken, async (req, res) => {
	const id = req.params.id;
	try {
		const blog = await Blog.findByIdAndDelete(id);
		if (!blog) {
			return res.status(400).json({
				message: 'Blog not found',
			});
		}
		return res.status(200).json({
			message: 'Blog deleted successfully',
		});
	} catch (error) {
		return res.status(500).json({
			message: 'Something went wrong',
		});
	}
});

app.get('/get-all-blogs', authenticateToken, async (req, res) => {
	try {
		const blogs = await Blog.find();
		return res.status(200).json({
			blogs,
		});
	} catch (error) {
		return res.status(500).json({
			message: 'Something went wrong',
		});
	}
});

app.get('/get-my-blogs', authenticateToken, async (req, res) => {
	const { user } = req.user;
	console.log(user);
	try {
		const blog = await Blog.find();
		const userBlog = blog.filter((x) => x.user.user._id == user._id);
		return res.status(200).json({
			message: 'Blogs found successfully',
			userBlog,
		});
	} catch (error) {
		return res.status(500).json({
			message: 'Something went wrong',
		});
	}
});

app.listen(PORT, () => {
	console.log(`Server has started on PORT: ${PORT}`);
	mongoose
		.connect(process.env.MONGO_URL)
		.then(() => {
			console.log('DB connected');
		})
		.catch((error) => {
			console.log('Error' + error);
		});
});
