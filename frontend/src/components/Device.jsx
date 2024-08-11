import { useEffect, useState } from 'react';
import axiosInstance from '../service/api';
import {
	aix,
	android,
	darwin,
	freebsd,
	linux,
	openbsd,
	sunos,
	win,
} from '../constants/operation_system_logo';

const Device = () => {
	const [deviceInfo, setDeviceInfo] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getUserDeviceInfo = async () => {
			try {
				const response = await axiosInstance.get('get-device-info');
				setDeviceInfo(response.data);
				console.log(response.data);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		getUserDeviceInfo();
	}, []);

	if (loading) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<h1 className='text-2xl font-semibold'>Loading...</h1>
			</div>
		);
	}

	if (!deviceInfo) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<h1 className='text-2xl font-semibold'>
					No device information available
				</h1>
			</div>
		);
	}

	const { hostname, operation_system, platform, processor } = deviceInfo;

	return (
		<div className='shadow-xl max-w-4xl mx-auto p-6 sm:p-10'>
			<h2 className='text-4xl font-semibold mb-10 text-center mt-10 tracking-widest'>
				Your Device
			</h2>
			<div className='flex flex-col sm:flex-row justify-between items-center'>
				<div className='flex flex-col space-y-6 text-lg px-3 py-2 sm:text-left text-center'>
					<p>
						<span className='font-semibold'>Name:</span> {hostname}
					</p>
					<p>
						<span className='font-semibold'>Processor:</span>{' '}
						{processor?.model || 'Unknown'}
					</p>
					<p>
						<span className='font-semibold'>Operating System:</span>{' '}
						{operation_system}
					</p>
				</div>
				<div className='flex-shrink-0 mt-6 sm:mt-0 sm:ml-6'>
					<img
						src={
							platform === 'win32'
								? win
								: platform === 'aix'
								? aix
								: platform === 'darwin'
								? darwin
								: platform === 'freebsd'
								? freebsd
								: platform === 'linux'
								? linux
								: platform === 'openbsd'
								? openbsd
								: platform === 'sunos'
								? sunos
								: platform === 'android'
								? android
								: null
						}
						alt='Operating System Logo'
						className='w-32 h-32 object-contain'
					/>
				</div>
			</div>
		</div>
	);
};

export default Device;
