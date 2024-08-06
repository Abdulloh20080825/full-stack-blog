import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../service/api';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const data = await axiosInstance.post('/login', {
				username,
				password,
			});
			localStorage.setItem('token', data.data.accessToken);
			navigate('/');
			setUsername('');
			setPassword('');
		} catch (error) {
			if (error.response.status === 400) {
				setError(error.response.data.message);
				console.log(error.response.data.message);
			}
		}
	};
	return (
		<div className='max-w-md mx-auto h-screen flex items-center '>
			<form
				className='flex flex-col space-y-10 text-center bg-white w-full shadow-2xl rounded-xl py-10 px-5'
				onSubmit={submitHandler}
			>
				<div className='p-3'>
					<p className='text-5xl leading-5 -tracking-tighter'>
						blo<span className='text-orange-600'>g</span>
					</p>
				</div>
				{error && (
					<p className='text-lg text-red-600 font-semibold'>Error {error}</p>
				)}
				<div className='w-full'>
					<input
						type='text'
						placeholder='Enter Username'
						autoComplete='off'
						name='username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className='w-full py-2 px-3 outline-none border-b border-black'
					/>
				</div>
				<div className='w-full'>
					<input
						type='password'
						placeholder='Enter Password'
						autoComplete='off'
						name='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='w-full py-2 px-3 outline-none border-b border-black'
					/>
				</div>
				<div className='flex flex-col space-y-5'>
					<button className='bg-orange-600 shadow-xl py-3 text-white font-semibold rounded-md'>
						Login
					</button>
					<p>Or</p>
					<Link
						to={'/register'}
						className='shadow-md py-3 text-sky-600 font-semibold rounded-md w-full'
					>
						<button>Create An account</button>
					</Link>
				</div>
			</form>
		</div>
	);
};

export default Login;
