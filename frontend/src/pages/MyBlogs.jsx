import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../service/api';

const MyBlogs = () => {
	const [blogs, setBlogs] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		if (!localStorage?.getItem('token')) {
			navigate('/login');
			return;
		}
		const getUserBlogs = async () => {
			const blogs = await axiosInstance.get('get-my-blogs');
			setBlogs(blogs.data.userBlog);
			console.log(blogs.data);
		};
		getUserBlogs();
	}, []);
	const onDeleteBlog = async (id) => {
		try {
			await axiosInstance.delete(`/delete-blog/${id}`);
			navigate('/blogs');
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 w-[80%] mx-auto gap-5 py-5 text-white'>
			{blogs?.map((item, index) => (
				<div
					key={index}
					className='h-auto pb-3 flex flex-col border shadow-lg rounded-xl overflow-hidden'
				>
					<img
						src={item.url}
						alt=''
						className='bg-white w-full h-[50%] object-cover'
					/>
					<div className='flex flex-col justify-between space-y-3 px-3'>
						<p className='text-center font-medium text-xl mt-2'>
							{item?.title}
						</p>
						<div className='space-y-2 py-2 px-3'>
							<p>
								Author:{' '}
								<span className='text-orange-600 font-medium'>
									{item.user.user.username}
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
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default MyBlogs;
