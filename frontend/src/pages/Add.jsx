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
		<div className='flex justify-center items-center mt-10'>
			<form
				className='flex flex-col space-y-5 shadow-lg w-[400px] bg-white text-black rounded-lg px-3 py-6'
				onSubmit={addBlogHandler}
			>
				<p className='text-3xl text-center font-medium'>
					Add Blo<span className='text-orange-600'>g</span>
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
				<button className='shadow-lg py-1 rounded-sm'>Add Blog</button>
			</form>
		</div>
	);
};

export default Add;
