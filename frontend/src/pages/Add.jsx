import { useEffect, useState } from 'react';
import axiosInstance from '../service/api';
import { useNavigate } from 'react-router-dom';

const Add = () => {
	const [url, setUrl] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const addBlogHandler = async (e) => {
		e.preventDefault();
		if (!url) {
			setError('Url is required');
			return;
		} else if (!title) {
			setError('Title is required');
			return;
		} else if (!description) {
			setError('Description is required');
			return;
		}
		try {
			await axiosInstance.post('/create-blog', {
				url,
				title,
				description,
			});

			navigate('/blogs');
		} catch (error) {
			console.log(error);
		}
		setUrl('');
		setTitle('');
		setDescription('');
	};

	useEffect(() => {
		if (!localStorage?.getItem('token')) {
			navigate('/login');
			return;
		}
	}, []);

	return (
		<div className='flex justify-center items-center min-h-screen bg-gray-900'>
			<form
				className='flex flex-col space-y-6 bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md'
				onSubmit={addBlogHandler}
			>
				<h1 className='text-3xl font-bold text-center text-slate-500'>
					Add a New Blog
				</h1>
				{error && (
					<p className='text-sm font-medium text-red-600 text-center'>
						{error}
					</p>
				)}
				<div className='w-full'>
					<input
						type='text'
						placeholder='Enter Image URL'
						autoComplete='off'
						name='url'
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						className='w-full py-2 px-3 bg-gray-700 text-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-slate-500'
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
						className='w-full py-2 px-3 bg-gray-700 text-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-slate-500'
					/>
				</div>
				<div className='w-full'>
					<textarea
						placeholder='Enter Description'
						autoComplete='off'
						name='description'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className='w-full py-2 px-3 bg-gray-700 text-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-slate-500 resize-none h-32'
					/>
				</div>
				<button
					type='submit'
					className='w-full py-2 px-3 bg-blue-900 hover:opacity-85 text-white font-semibold rounded-lg shadow-lg transition duration-300'
				>
					Add Blog
				</button>
			</form>
		</div>
	);
};

export default Add;
