import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../service/api';

const EditBlog = () => {
	const [url, setUrl] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		const getBlogInfo = async () => {
			try {
				const response = await axiosInstance.get(`view-blog/${id}`);
				setUrl(response?.data?.blog?.url);
				setTitle(response?.data?.blog?.title);
				setDescription(response?.data?.blog?.description);
			} catch (error) {
				console.error(error);
				setError('Failed to fetch blog information.');
			}
		};
		getBlogInfo();
	}, [id]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axiosInstance.put(`update-blog/${id}`, {
				url,
				title,
				description,
			});
			navigate(`/blog/${id}`);
		} catch (error) {
			console.error(error);
			setError('Failed to update the blog.');
		}
	};

	return (
		<div className='flex justify-center items-center mt-10'>
			<form
				className='flex flex-col space-y-5 shadow-lg w-[400px] bg-white text-black rounded-lg px-3 py-6'
				onSubmit={handleSubmit}
			>
				<p className='text-3xl text-center font-medium'>
					Edit Blo<span className='text-orange-600'>g</span>
				</p>
				{error && (
					<p className='text-sm font-medium text-red-600 text-center'>
						{error}
					</p>
				)}

				<div className='w-full'>
					<input
						type='text'
						placeholder='Enter Url'
						autoComplete='off'
						name='url'
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						className='w-full py-2 px-3 outline-none border-b border-black'
					/>
				</div>
				<div className='w-full'>
					<input
						type='text'
						placeholder='Enter Title'
						autoComplete='off'
						name='title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className='w-full py-2 px-3 outline-none border-b border-black'
					/>
				</div>
				<div className='w-full'>
					<input
						type='text'
						placeholder='Enter Description'
						autoComplete='off'
						name='description'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className='w-full py-2 px-3 outline-none border-b border-black'
					/>
				</div>
				<button
					type='submit'
					className='shadow-lg py-1 rounded-sm bg-orange-500 text-white'
				>
					Update Blog
				</button>
			</form>
		</div>
	);
};

export default EditBlog;
