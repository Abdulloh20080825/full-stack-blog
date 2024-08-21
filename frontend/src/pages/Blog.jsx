import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../service/api';
import { MdDelete } from 'react-icons/md';

const Blog = ({ user }) => {
	const [selectedBlog, setSelectedBlog] = useState({});
	const [blogComment, setBlogComments] = useState([]);
	const [comment, setComment] = useState('');
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const { blog } = useParams();

	const getComments = async () => {
		try {
			const res = await axiosInstance.get(`/get-comment/${blog}`);
			setBlogComments(res.data.reverse());
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (!localStorage?.getItem('token')) {
			navigate('/login');
			return;
		}
		const onViewBlog = async () => {
			try {
				const response = await axiosInstance.get(`/view-blog/${blog}`);
				setSelectedBlog(response.data);
				navigate(`/blog/${blog}`);
			} catch (error) {
				console.log(error);
			}
		};

		onViewBlog();
		getComments();
	}, []);

	const PostComment = async () => {
		try {
			await axiosInstance.post(`/comment/${blog}`, {
				comment,
			});
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const onDeleteComment = async (id) => {
		try {
			await axiosInstance.delete(`/delete-comment/${blog}/${id}`);
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};
	const onPostComment = async (e) => {
		e.preventDefault();
		if (!comment.length) {
			setError('Write a comment !!!');
			return;
		}
		PostComment();
	};

	return (
		<div className='text-white flex flex-col items-center w-[70%] mt-10 mx-auto shadow-lg py-5 px-10 rounded-lg bg-gradient-to-b from-gray-800 to-gray-900'>
			<img
				src={selectedBlog.url}
				alt=''
				className='w-full h-[300px] object-cover rounded-2xl mt-2 shadow-md'
			/>
			<div className='w-full'>
				<p className='text-3xl sm:text-5xl mt-10 tracking-wide text-center mb-5 font-bold text-white'>
					{selectedBlog.title}
				</p>
				<div className='flex flex-col sm:flex-row justify-between mb-5'>
					<Link to={`/profile/${selectedBlog?.user?.username}`}>
						<p className='text-sm sm:text-lg text-gray-400'>
							Author:{' '}
							<span className='text-orange-500 font-semibold'>
								{selectedBlog?.user?.username}
							</span>
						</p>
					</Link>
					<p className='text-sm sm:text-lg text-gray-400'>
						Created at:{' '}
						<span className='text-orange-500 font-semibold'>
							{moment(selectedBlog?.createdAt).format('MMM DD YYYY')}
						</span>
					</p>
				</div>
				<p className='text-sm sm:text-xl mt-5 capitalize shadow-inner pb-2 px-3 bg-gray-700 rounded-md text-white'>
					{selectedBlog.description}
				</p>
				<form
					className='mt-10 mb-10 w-full px-10 space-y-5'
					onSubmit={onPostComment}
				>
					{error && (
						<p className='text-red-500 mb-5 font-semibold tracking-wide'>
							{error}
						</p>
					)}
					<label
						htmlFor='comment'
						className='text-lg sm:text-xl text-center w-full text-gray-400'
					>
						Write your comment
					</label>
					<div className='flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4'>
						<input
							type='text'
							id='comment'
							autoComplete='off'
							name='comment'
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							className='w-full py-2 px-3 text-lg outline-none bg-gray-800 text-white border-2 border-gray-700 rounded-md focus:border-orange-500 transition-colors'
						/>
						<button
							type='submit'
							className='bg-orange-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-orange-600 transition-colors'
						>
							Post
						</button>
					</div>
				</form>

				<p className='text-xl font-medium tracking-wide mb-5 text-gray-400'>
					All comments
				</p>
				{blogComment.length ? (
					blogComment.map((item, index) => (
						<div
							key={index}
							className='bg-gray-800 rounded-md p-4 mb-5 shadow-inner border border-gray-700'
						>
							<div className='flex justify-between items-center'>
								<div>
									<Link to={`/profile/${item?.user?.username}`}>
										<p className='font-semibold text-white'>
											Author:{' '}
											<span className='text-orange-500 font-bold'>
												{item?.user?.username}
											</span>
										</p>
									</Link>
									<p className='text-gray-500 text-xs'>
										{moment(item?.createdAt).format('MMM DD YYYY')}
									</p>
								</div>
								{user?.username === item?.user?.username && (
									<MdDelete
										className='cursor-pointer text-red-600 text-xl hover:text-red-700 transition-colors'
										onClick={() => onDeleteComment(item._id)}
									/>
								)}
							</div>
							<p className='text-sm text-gray-400 mt-2'>{item.comment}</p>
						</div>
					))
				) : (
					<div className='w-full flex justify-center my-10'>
						<p className='text-gray-500'>No comments yet...</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Blog;
