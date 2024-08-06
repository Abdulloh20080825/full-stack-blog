import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
	const navigate = useNavigate();
	useEffect(() => {
		if (!localStorage?.getItem('token')) {
			navigate('/login');
			return;
		}
	}, []);
	return (
		<div className='flex flex-col py-5 text-white'>
			<p className='text-3xl text-center mb-10'>About Us</p>
			<div className='flex flex-col space-y-5'>
				<p className='capitalize text-4xl font-semibold'>
					blo<span className='text-orange-600 lowercase'>g</span> cr
					<span className='text-orange-600 lowercase'>e</span>ea
					<span className='text-orange-600 lowercase'>t</span>ion
				</p>
				<p className='capitalize'>
					create blogs and share your thoughts, leave comments and questions
				</p>{' '}
				<p className='capitalize text-4xl font-semibold'>
					Cod<span className='text-orange-600 lowercase'>e</span> f
					<span className='text-orange-600 lowercase'>o</span>r In
					<span className='text-orange-600 lowercase'>t</span>erview
				</p>
				<p>
					I{"'"}m a Junior Full Stack developer basend in Tashkent.I{"'"}ve
					built websites.If you are interested, you can view some of my favorite
					projects here{' '}
					<a
						href='https://github.com/Abdulloh20080825'
						className='underline text-orange-500'
					>
						Github
					</a>
				</p>
			</div>
		</div>
	);
};

export default About;
