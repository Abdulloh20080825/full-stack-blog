import React from 'react';

const AdminAllBlogs = ({ adminBlogs }) => {
	return (
		<div className='p-4 w-full'>
			<h1 className='text-3xl font-bold mb-6 text-white'>Blogs</h1>
			<p className='text-gray-400 mb-6'>Manage your blogs here.</p>
			<p className='mb-6 text-lg text-gray-300 '>
				Total Blogs: {adminBlogs.length}
			</p>

			<div className='overflow-x-auto '>
				<table className='min-w-full bg-white border border-gray-200 w-full'>
					<thead>
						<tr>
							<th className='px-4 py-2 border-b border-gray-200 text-left'>
								ID
							</th>
							<th className='px-4 py-2 border-b border-gray-200 text-left'>
								Name
							</th>
							<th className='px-4 py-2 border-b border-gray-200 text-left'>
								Username
							</th>

							<th className='px-4 py-2 border-b border-gray-200 text-right'>
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{adminBlogs.map((blog, idx) => (
							<tr key={idx} className='hover:bg-gray-100'>
								<td className='px-4 py-2 border-b border-gray-200'>
									{adminBlogs.indexOf(blog) + 1}
								</td>
								<td className='px-4 py-2 border-b border-gray-200'>
									{blog.title.length >= 30
										? `${blog.title.slice(0, 30)}...`
										: blog.title}
								</td>
								<td className='px-4 py-2 border-b border-gray-200 text-orange-600'>
									{blog.user.username}
								</td>

								<td className='px-4 py-2 border-b border-gray-200 text-right'>
									<button className='text-red-500 hover:underline'>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AdminAllBlogs;
