import { feautureData } from '../constants/feautureData';

const Features = () => {
	return (
		<div className='min-h-screen bg-gray-900 text-gray-100 py-10 px-5 md:px-20'>
			<h1 className='text-4xl font-bold text-center mb-10'>
				Platform Features
			</h1>

			<div className='space-y-10'>
				{feautureData.map((item, idx) => (
					<div
						className={`flex flex-col ${
							idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
						} items-center`}
						key={idx}
					>
						<img
							src={item.url}
							alt='Responsive Design'
							className='w-full md:w-1/2 rounded-lg shadow-lg'
						/>
						<div className='md:w-1/2 md:pl-10 mt-5 md:mt-0'>
							<h2 className='text-3xl font-bold mb-3'>{item.title}</h2>
							<p className='text-lg'>{item.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Features;
