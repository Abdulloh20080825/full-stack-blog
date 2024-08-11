import React, { useState } from 'react';
import { validateFields } from '../constants/changePassValidation';
import axiosInstance from '../service/api';

const ChangePass = ({ user }) => {
	const [oldPass, setOldPass] = useState('');
	const [newPass, setNewPass] = useState('');
	const [confirmPass, setConfirmPass] = useState('');
	const [error, setError] = useState({
		query: null,
		message: null,
	});

	const changePasswordHandler = async (e) => {
		e.preventDefault();
		try {
			const validationError = validateFields(
				user,
				oldPass,
				newPass,
				confirmPass
			);
			if (validationError) {
				setError(validationError);
				return;
			}

			const response = await axiosInstance.post('/change-password', {
				newpassword: newPass,
			});

			if (response.status === 200) {
				setError({ query: null, message: null });
				setOldPass('');
				setNewPass('');
				setConfirmPass('');
				alert('Password changed successfully');
			} else {
				setError({
					query: 'server',
					message: response.data.message || 'Something went wrong',
				});
			}
		} catch (error) {
			console.error('Frontend error:', error);
			setError({ query: 'server', message: 'Failed to change password' });
		}
	};

	return (
		<div className='my-8'>
			<p className='text-xl font-semibold mb-4'>Change Password</p>
			{error.message && (
				<p className='font-medium text-xl text-center my-4 text-red-600'>
					{error.message}
				</p>
			)}
			<form onSubmit={changePasswordHandler}>
				<div className='mb-4'>
					<label htmlFor='old-password' className='block text-sm font-medium'>
						Old Password
					</label>
					<input
						type='password'
						id='old-password'
						name='oldpassword'
						value={oldPass}
						onChange={(e) => setOldPass(e.target.value)}
						placeholder='Enter your old password'
						className={`mt-1 block w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
							oldPass.length
								? ''
								: error.query === 'oldpass' || error.query === 'all'
								? 'border-red-600'
								: ''
						}`}
					/>
				</div>
				<div className='mb-4'>
					<label htmlFor='new-password' className='block text-sm font-medium'>
						New Password
					</label>
					<input
						type='password'
						id='new-password'
						name='newpassword'
						value={newPass}
						onChange={(e) => setNewPass(e.target.value)}
						placeholder='Enter your new password'
						className={`mt-1 block w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
							newPass.length
								? ''
								: error.query === 'newpass' || error.query === 'all'
								? 'border-red-600'
								: ''
						}`}
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='confirm-password'
						className='block text-sm font-medium'
					>
						Confirm New Password
					</label>
					<input
						type='password'
						id='confirm-password'
						value={confirmPass}
						onChange={(e) => setConfirmPass(e.target.value)}
						placeholder='Confirm your new password'
						className={`mt-1 block w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
							confirmPass.length
								? ''
								: error.query === 'confirm' || error.query === 'all'
								? 'border-red-600'
								: ''
						}`}
					/>
				</div>
				<button
					type='submit'
					className='bg-blue-500 text-white px-4 py-2 rounded-md'
				>
					Change Password
				</button>
			</form>
		</div>
	);
};

export default ChangePass;
