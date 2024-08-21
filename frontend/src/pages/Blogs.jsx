import { useEffect, useState } from 'react';
import axiosInstance from '../service/api';
import { Link, useNavigate } from 'react-router-dom';

const Blogs = ({ user }) => {
	const [blogs, setBlogs] = useState([]);
	const navigate = useNavigate();

	const getAllBlogs = async () => {
		const data = await axiosInstance.get('/get-all-blogs');
		setBlogs(data?.data.reverse());
	};
	const onDeleteBlog = async (id) => {
		try {
			await axiosInstance.delete(`/delete-blog/${id}`);
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (!localStorage?.getItem('token')) {
			navigate('/login');
			return;
		}
		getAllBlogs();
	}, []);

	return (
		<div className='min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-5 w-full mx-auto py-5 px-4 md:px-20 text-slate-300'>
			<div className='flex flex-col space-y-5'>
				{blogs.length ? (
					blogs.map((item, index) => (
						<div
							key={index}
							className='flex flex-row border shadow-lg shadow-slate-700 rounded-xl overflow-hidden'
						>
							<img
								src={item.url}
								alt='Image not found'
								className='bg-white w-1/3 h-48 object-cover text-black'
							/>
							<div className='flex flex-col justify-between p-4 w-2/3 space-y-3'>
								<p className='text-center font-medium text-xl'>
									{item?.title.length > 15
										? `${item?.title.slice(0, 15)} ...`
										: item.title}
								</p>
								<div className='space-y-2'>
									<Link to={`/profile/${item.user.username}`}>
										<p>
											Author:{' '}
											<span className='text-orange-600 font-medium'>
												{item?.user?.username}
											</span>
										</p>
									</Link>
									<p className='capitalize'>
										{item.description.length >= 30
											? `${item.description.slice(0, 30)}...`
											: item.description}
									</p>
								</div>
								<div className='flex space-x-3'>
									<Link to={`/blog/${item._id}`}>
										<button className='border rounded-md py-1 px-3'>
											View
										</button>
									</Link>
									{user?.username === item?.user?.username && (
										<>
											<Link to={`/edit/${item._id}`}>
												<button className='border rounded-md py-1 px-3 text-sky-300'>
													Edit
												</button>
											</Link>
											<button
												className='border rounded-md py-1 px-3 text-red-600'
												onClick={() => onDeleteBlog(item._id)}
											>
												Delete
											</button>
										</>
									)}
								</div>
							</div>
						</div>
					))
				) : (
					<div className='w-full mt-10'>
						<p className='text-3xl tracking-wider'>No blogs found</p>
						<p className='text-slate-600'>
							click to create blog{' '}
							<Link to={'/add'} className='border-b text-white'>
								Create
							</Link>
						</p>
					</div>
				)}
			</div>

			<div className='flex flex-col justify-center items-center space-y-5'>
				<h2 className='text-4xl font-bold'>Explore More</h2>
				<p className='text-lg text-center'>
					Check out our latest features and updates. Stay tuned for more
					exciting content!
				</p>
				<Link
					to='/features'
					className='bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-full transition duration-300'
				>
					Explore Features
				</Link>
			</div>
		</div>
	);
};

export default Blogs;
