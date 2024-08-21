import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = ({ user }) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			navigate('/login');
			return;
		}
	}, []);

	if (!user) {
		return (
			<div>
				<h1>Loading...</h1>
			</div>
		);
	}

	return (
		<div className='h-full bg-gray-900 text-gray-100 pt-5 w-[100%]'>
			<h1 className='text-center font-bold text-2xl tracking-widest'>
				Welcome {user.name} 👋
			</h1>
			<div className='flex flex-col md:flex-row items-center md:items-start space-y-10 md:space-y-0 md:space-x-10 justify-center pt-10 px-4 md:px-20'>
				<div className='w-full md:w-1/2 lg:w-1/3 p-5 rounded-lg shadow-lg bg-gray-800'>
					<img
						className='w-full rounded-lg mb-4'
						src='https://t3.ftcdn.net/jpg/03/48/39/74/360_F_348397404_wXuf22GUPNAh67htBZZnaDSx3Bj92yep.jpg'
						alt='Welcome'
					/>
					<h1 className='text-3xl font-bold mb-4 text-center'>
						Create Your Blogs
					</h1>

					<p className='text-center mb-6'>
						Start sharing your thoughts and ideas with the world. Customize your
						blog with beautiful themes and layouts.
					</p>
					<div className='flex justify-center'>
						<button
							className='bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-full transition duration-300'
							onClick={() => navigate('/add')}
						>
							Get Started
						</button>
					</div>
				</div>
				<div className='w-full md:w-1/2 lg:w-2/3 p-5 rounded-lg shadow-lg bg-gray-800'>
					<h2 className='text-2xl font-bold mb-4 text-center'>
						Why Choose Us?
					</h2>
					<ul className='list-disc list-inside space-y-2'>
						<li>
							📱 <span className='font-semibold'>Responsive Design:</span> Your
							blog looks great on all devices.
						</li>
						<li>
							🌐 <span className='font-semibold'>Global Reach:</span> Share your
							content with a worldwide audience.
						</li>
						<li>
							🛡️ <span className='font-semibold'>Security:</span> Your data is
							safe and secure with us.
						</li>
						<li>
							⚡ <span className='font-semibold'>Fast Performance:</span>{' '}
							Optimized for speed and reliability.
						</li>
						<li>
							💬 <span className='font-semibold'>Community:</span> Engage with
							your readers through comments and feedback.
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Main;
