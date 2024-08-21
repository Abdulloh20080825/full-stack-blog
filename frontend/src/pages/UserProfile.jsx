import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../service/api';

const UserProfile = ({ user }) => {
	const [userInfo, setUserInfo] = useState(null);
	const [userBlogs, setUserBlogs] = useState([]);
	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		if (id === user.username) {
			navigate('/my-blogs');
		}

		const getUserInfo = async function () {
			const res = await axiosInstance.get(`/get-user-info/${id}`);
			setUserInfo(res.data.user);
			const getBlogs = await axiosInstance.get(`/get-user-blogs/${id}`);
			setUserBlogs(getBlogs.data.blogs);
		};
		getUserInfo();
	}, []);

	if (!userInfo) {
		return (
			<div className='text-white'>
				<h1>Loading...</h1>
			</div>
		);
	}

	if (!userBlogs) {
		return (
			<div className='text-white'>
				<h1>Loading...</h1>
			</div>
		);
	}
	return (
		<div className='text-white '>
			<h1 className='text-3xl capitalize'>
				<span className='text-orange-600 '>{userInfo.username}s</span> blogs
			</h1>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 m-10'>
				{userBlogs.map((item, idx) => (
					<div
						key={idx}
						className='h-[400px] pb-3 flex flex-col border shadow-lg shadow-slate-700 rounded-xl overflow-hidden'
					>
						<img
							src={item.url}
							alt='Image not found'
							className='bg-white w-full h-[50%] object-cover text-black '
						/>
						<div className='flex flex-col justify-between space-y-3 px-3'>
							<p className='text-center font-medium text-xl mt-2'>
								{item?.title.length > 15
									? `${item?.title.slice(0, 15)} ...`
									: item.title}
							</p>
							<div className='space-y-2 py-2 px-3'>
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
									<button className='border rounded-md py-1 px-3'>View</button>
								</Link>
								{item.user.username === user.username ? (
									<>
										<Link to={`/edit/${item._id}`}>
											<button className='border rounded-md py-1 px-3 text-sky-300'>
												Edit
											</button>
										</Link>
										<button className='border rounded-md py-1 px-3 text-red-600'>
											Delete
										</button>
									</>
								) : null}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default UserProfile;
