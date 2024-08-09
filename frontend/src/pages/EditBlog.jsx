import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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

				setUrl(response.data.url);
				setTitle(response.data.title);
				setDescription(response.data.description);
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
		<div className='flex justify-center items-center mt-10 px-2'>
			<form
				className='flex flex-col space-y-5 w-[100%] sm:w-[50%]  shadow-inner shadow-slate-600  text-black rounded-lg px-3 py-6'
				onSubmit={handleSubmit}
			>
				<p className='text-3xl text-center font-medium text-white'>
					Edit Blo<span className='text-orange-600'>g</span>
				</p>
				{error && (
					<p className='text-sm font-medium text-red-600 text-center'>
						{error}
					</p>
				)}

				<div className='w-full'>
					<label htmlFor='url' className='text-slate-600 text-sm'>
						Url
					</label>
					<input
						type='text'
						placeholder='Enter Url'
						autoComplete='off'
						id='url'
						name='url'
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						className='w-full py-2 px-3 outline-none bg-transparent text-slate-400 border-b-2 border-slate-900'
					/>
				</div>
				<div className='w-full'>
					<label htmlFor='title' className='text-slate-600 text-sm'>
						Title
					</label>
					<input
						type='text'
						placeholder='Enter Title'
						autoComplete='off'
						id='title'
						name='title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className='w-full py-2 px-3 outline-none bg-transparent text-slate-400 border-b-2 border-slate-900'
					/>
				</div>
				<div className='w-full'>
					<label htmlFor='description' className='text-slate-600 text-sm'>
						Description
					</label>
					<input
						type='text'
						placeholder='Enter Description'
						autoComplete='off'
						id='description'
						name='description'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className='w-full py-2 px-3 outline-none bg-transparent text-slate-400 border-b-2 border-slate-900'
					/>
				</div>
				<button
					type='submit'
					className='shadow-md py-1 rounded-md  text-slate-300 shadow-slate-600'
				>
					Update Blog
				</button>
				<p className='text-orange-600 text-center font-bold'>Or</p>
				<Link className='w-full' to={'/blogs'}>
					<button className='w-full shadow-inner py-1 text-sky-600 font-semibold rounded-md  shadow-slate-600'>
						Cancel
					</button>
				</Link>
			</form>
		</div>
	);
};

export default EditBlog;
