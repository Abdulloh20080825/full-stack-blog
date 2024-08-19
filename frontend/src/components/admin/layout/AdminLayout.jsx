import React from 'react';
import { Link } from 'react-router-dom';

const AdminLayout = ({ children }) => {
	return (
		<div className='flex h-screen'>
			<nav className='w-64 bg-gray-900 text-white p-6 flex flex-col'>
				<h2 className='text-3xl font-extrabold mb-8 tracking-tight'>
					Admin Panel
				</h2>
				<ul className='space-y-4'>
					<li>
						<Link
							to='/admin/users'
							className='text-white hover:text-gray-300 transition duration-200'
						>
							Users
						</Link>
					</li>
					<li>
						<Link
							to='/admin/blogs'
							className='text-white hover:text-gray-300 transition duration-200'
						>
							Blogs
						</Link>
					</li>
				</ul>
			</nav>
			<main className='flex-1  p-8 overflow-auto'>{children}</main>
		</div>
	);
};

export default AdminLayout;
