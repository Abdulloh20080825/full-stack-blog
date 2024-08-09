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
		<div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 w-[80%] mx-auto gap-5 py-5 text-white'>
			{blogs.length ? (
				blogs?.map((item, index) => (
					<div
						key={index}
						className='h-auto pb-3 flex flex-col border shadow-md shadow-white rounded-xl overflow-hidden'
					>
						<img
							src={item.url}
							alt='Image not found'
							className='bg-white w-full h-[50%] object-cover text-black '
						/>
						<div className='flex flex-col justify-between space-y-3 px-3'>
							<p className='text-center font-medium text-xl mt-2'>
								{item?.title}
							</p>
							<div className='space-y-2 py-2 px-3'>
								{console.log(item)}
								<p>
									Author:{' '}
									<span className='text-orange-600 font-medium'>
										{item?.user?.username}
									</span>
								</p>
								<p className='capitalize'>
									{item.description.length >= 30
										? `${item.description.slice(0, 30)}...`
										: item.description}
								</p>
							</div>
							<div className='flex space-x-3'>
								<Link to={`/blog/${item._id}`}>
									<button className='border rounded-md py-1 px-3'>View</button>
								</Link>
								{item?.user?.user ? (
									<>
										{user?.username === item?.user?.user?.username ? (
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
										) : (
											''
										)}
									</>
								) : (
									<>
										{user?.username === item?.user?.username ? (
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
										) : (
											''
										)}
									</>
								)}
							</div>
						</div>
					</div>
				))
			) : (
				<div className='w-[60%] mx-auto mt-10'>
					<p className='text-3xl tracking-wider'>No blogs found</p>
					<p className='text-slate-600'>
						click to create blog {')'}{' '}
						<Link to={'/add'} className='border-b text-white'>
							Create
						</Link>{' '}
					</p>
				</div>
			)}
		</div>
	);
};

export default Blogs;
