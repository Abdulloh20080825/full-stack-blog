import { useState } from 'react';
import axios from 'axios';
import axiosInstance from '../service/api';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage('');
		setError('');
		try {
			const response = await axiosInstance.post('/forgot-password', { email });
			setMessage(response.data);
		} catch (err) {
			setError(
				err.response.data.error || 'Something went wrong, please try again.'
			);
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center '>
			<div className='w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg'>
				<h2 className='text-center text-2xl font-bold text-gray-900'>
					Forgot Password
				</h2>
				<form onSubmit={handleSubmit}>
					<div className='flex flex-col space-y-4'>
						<label
							htmlFor='email'
							className='text-sm font-medium text-gray-700'
						>
							Email Address
						</label>
						<input
							type='email'
							id='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600'
						/>
						<button
							type='submit'
							className='w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 focus:outline-none'
						>
							Send Reset Link
						</button>
					</div>
				</form>
				{message && (
					<p className='mt-4 text-green-600 text-center'>{message}</p>
				)}
				{error && <p className='mt-4 text-red-600 text-center'>{error}</p>}
			</div>
		</div>
	);
};

export default ForgotPassword;
