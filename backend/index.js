const express = require('express');
const { default: mongoose } = require('mongoose');
const BlogRoutes = require('./routes/blog.router');
const CommentRoutes = require('./routes/comment.router');
const cors = require('cors');
const AuthRoutes = require('./routes/auth.router');
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
app.use(CommentRoutes);

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
