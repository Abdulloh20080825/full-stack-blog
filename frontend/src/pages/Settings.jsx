import React, { useEffect, useState } from 'react';
import SettingsNavigation from '../components/settingsNavigation';
import { Outlet, useNavigate } from 'react-router-dom';

const Settings = () => {
	const [active, setActive] = useState('profile');

	const navigate = useNavigate();

	useEffect(() => {
		if (active === 'profile') {
			navigate('user');
		}
	}, []);

	return (
		<div className='text-white mx-5 p-6 bg-gray-800 w-[100%] lg:w-[70%] lg:mx-auto mt-10 rounded-lg h-[600px] overflow-hidden py-3 '>
			<div className='h-full my-3 overflow-scroll'>
				<div className='mb-8'>
					<h1 className='text-3xl font-bold'>Settings</h1>
				</div>
				<div className=''>
					<SettingsNavigation setActive={setActive} active={active} />
				</div>
				<Outlet />
			</div>
		</div>
	);
};

export default Settings;
