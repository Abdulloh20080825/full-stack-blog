import moment from 'moment';
import React from 'react';

const User = ({ user }) => {
	return (
		<div className='p-6 bg-gray-800 text-white rounded-lg shadow-md'>
			<p className='text-center text-xl lg:text-4xl font-semibold mb-3 tracking-widest'>
				User Info
			</p>
			<div className='mb-4 flex flex-col md:flex-row items-start md:items-center sm:justify-between'>
				<div>
					<p className='text-sm lg:text-lg font-semibold'>
						Name: <span className='font-normal'>{user?.name}</span>
					</p>
					<p className='text-sm lg:text-lg font-semibold'>
						Username: <span className='font-normal'>{user?.username}</span>
					</p>
				</div>
				<div>
					<p className='text-[10px] lg:text-[16px] text-orange-400'>
						User created At: {moment(user.createdAt).format('MM.Do.YYYY ')}
					</p>
					<p className='text-[10px] lg:text-[16px]'>
						At Time {moment(user.createdAt).format('h:mm:ss a')}
					</p>
				</div>
			</div>
			<p className='text-sm text-gray-400'>@Dedicated by Abdulloh</p>
		</div>
	);
};

export default User;
