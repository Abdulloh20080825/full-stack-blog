import React from 'react';

const Users = ({ adminUsers }) => {
	const users = [
		{ id: 1, name: 'John Doe', email: 'john@example.com' },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com' },
		{ id: 3, name: 'Mike Johnson', email: 'mike@example.com' },
	];
	return (
		<div className='p-4 w-full'>
			<h1 className='text-3xl font-bold mb-6 text-white'>Users</h1>
			<p className='text-gray-400 mb-6'>Manage your users here.</p>
			<p className='mb-6 text-lg text-gray-300 '>
				Total Users: {adminUsers.length}
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
						{adminUsers.map((user, idx) => (
							<tr key={idx} className='hover:bg-gray-100'>
								<td className='px-4 py-2 border-b border-gray-200'>
									{adminUsers.indexOf(user) + 1}
								</td>
								<td className='px-4 py-2 border-b border-gray-200'>
									{user.name}
								</td>
								<td className='px-4 py-2 border-b border-gray-200'>
									{user.username}
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

export default Users;
