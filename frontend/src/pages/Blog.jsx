import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../service/api';

const Blog = () => {
	const [selectedBlog, setSelectedBlog] = useState({});
	const navigate = useNavigate();
	const { id } = useParams();
	useEffect(() => {
		if (!localStorage?.getItem('token')) {
			navigate('/login');
			return;
		}
		const onViewBlog = async () => {
			try {
				const response = await axiosInstance.get(`/view-blog/${id}`);
				setSelectedBlog(response.data);
				navigate(`/blog/${id}`);
			} catch (error) {
				console.log(error);
			}
		};
		onViewBlog();
	}, []);

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
				<p className='text-2xl mt-5 capitalize'>{selectedBlog.description}</p>
			</div>
		</div>
	);
};

export default Blog;
