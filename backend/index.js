const express = require('express');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const Blog = require('./models/Blog');
const BlogRoutes = require('./routes/blog.router');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const AuthRoutes = require('./routes/auth.router');
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

app.use(AuthRoutes);
app.use(BlogRoutes);

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
