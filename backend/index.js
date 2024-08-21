const express = require('express');
const { default: mongoose } = require('mongoose');
const BlogRoutes = require('./routes/blog.router');
const CommentRoutes = require('./routes/comment.router');
const DeviceRoutes = require('./routes/device.info.router');
const AdminRoutes = require('./routes/admin.routes');
const cors = require('cors');
const AuthRoutes = require('./routes/auth.router');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 4040;

const corsConfig = {
	origin: '*',
	credential: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWJkdWxsb2giLCJlbWFpbCI6ImFiZHVsbG9oQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWJkdWxsb2giLCJwYXNzd29yZCI6IjIwMDA4MDgyNSIsIl9pZCI6IjY2YzQ3ZTAzODlhYTJjNjdkZmZmZWFiNSIsImNyZWF0ZWRBdCI6IjIwMjQtMDgtMjBUMTE6Mjk6MDcuODI1WiIsInVwZGF0ZWRBdCI6IjIwMjQtMDgtMjBUMTE6Mjk6MDcuODI1WiIsIl9fdiI6MCwiaWF0IjoxNzI0MTUzMzQ4LCJleHAiOjE3MjY3NDUzNDh9.hWakq5p9He5gWlr625pgTa-9e9abrD2D8PEpc6U7iqE

app.options("", cors(corsConfig))

app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(AuthRoutes);
app.use(BlogRoutes);
app.use(CommentRoutes);
app.use(DeviceRoutes);
app.use('/admin', AdminRoutes);

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
