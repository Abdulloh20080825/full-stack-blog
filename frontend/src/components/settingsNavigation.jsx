import React from 'react';
import { Link } from 'react-router-dom';

const SettingsNavigation = ({ setActive, active }) => {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-3 gap-4 text-center my-5 overflow-x-auto'>
			<Link to={'user'}>
				<div
					className={`${
						active === 'profile' ? 'bg-slate-500 text-black' : ' '
					} w-full py-2 cursor-pointer rounded-xl transition-colors duration-300 hover:bg-slate-400`}
					onClick={() => setActive('profile')}
				>
					<p className='font-bold text-sm md:text-xl'>Profile</p>
				</div>
			</Link>
			<Link to={'device'}>
				<div
					className={`${
						active === 'device' ? 'bg-slate-500 text-black' : ' '
					} w-full py-2 cursor-pointer rounded-xl transition-colors duration-300 hover:bg-slate-400`}
					onClick={() => setActive('device')}
				>
					<p className='font-bold text-sm md:text-xl'>Device</p>
				</div>
			</Link>
			<Link to={'change'}>
				<div
					className={`${
						active === 'change' ? 'bg-slate-500 text-black' : ' '
					} w-full py-2 cursor-pointer rounded-xl transition-colors duration-300 hover:bg-slate-400`}
					onClick={() => setActive('change')}
				>
					<p className='font-bold text-sm md:text-xl'>Change Password</p>
				</div>
			</Link>
		</div>
	);
};

export default SettingsNavigation;
