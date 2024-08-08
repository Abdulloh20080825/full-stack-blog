import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../service/api';

const Blog = () => {
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
			const res = await axiosInstance.post(`/comment/${blog}`, {
				comment,
			});
			window.location.reload();

			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};

	const onPostComment = async (e) => {
		e.preventDefault();
		if (!comment.length) setError('Write cooment !!!');
		PostComment();
	};

	return (
		<div className='text-white flex flex-col items-center w-[70%] mx-auto'>
			<img
				src={selectedBlog.url}
				alt=''
				className='w-full h-[300px] object-cover'
			/>
			<div className='w-full'>
				<p className='text-2xl sm:text-5xl mt-10 tracking-widest text-center mb-5'>
					{selectedBlog.title}
				</p>
				<div className='flex flex-col sm:flex-row justify-between'>
					<p className='text-sm sm:text-xl'>
						Author:{' '}
						<span className='text-orange-600'>
							{selectedBlog?.user?.username}
						</span>
					</p>
					<p className='text-sm sm:text-xl'>
						Created at:{' '}
						<span className='text-orange-600 font-semibold'>
							{moment(selectedBlog?.createdAt).format('MMM DD YYYY')}
						</span>
					</p>
				</div>
				<p className='text-sm sm:text-2xl mt-5 capitalize border-b-2 shadow-md shadow-slate-600'>
					{selectedBlog.description}
				</p>
				<form
					className='mt-10 mb-10 w-full px-10 space-y-5'
					onSubmit={onPostComment}
				>
					<p className='text-red-600 mb-5'>{error && error}</p>
					<label htmlFor='comment' className='text-2xl'>
						Write your comment
					</label>
					<div className='flex space-x-4 items-center'>
						<input
							type='text'
							id='comment'
							autoComplete='off'
							name='comment'
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							className='w-full py-2 px-3 text-white text-lg  outline-none bg-transparent border-b-2 border-white'
						/>
						<button
							type='submit'
							className='border-2 px-2 sm:px-4 sm:py-2 rounded-md'
						>
							Post
						</button>
					</div>
				</form>

				<p className='text-xl font-medium '>All comments</p>
				{blogComment.length ? (
					blogComment?.map((item, index) => (
						<div
							key={index}
							className='shadow-inner rounded-sm py-2 px-4 shadow-slate-700 my-5 border-b border-slate-700'
						>
							{console.log(item)}
							<div className='flex space-x-2'>
								<p className='tracking-wide font-semibold'>
									Author:{' '}
									<span className='text-orange-600'>
										{item?.user?.username}
									</span>
								</p>
								<p className='text-slate-500'>
									{moment(item?.createdAt).format('MMM DD YYYY')}
								</p>
							</div>

							<p>{item.comment}</p>
						</div>
					))
				) : (
					<div className='w-full flex justify-center my-10'>
						<p>No comments yet...</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Blog;
