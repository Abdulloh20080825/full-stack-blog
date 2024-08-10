import React from 'react';
import { NavLink } from 'react-router-dom';

const Section = ({ user, onLogout, closeModal }) => {
	return (
		<ul className='flex flex-col w-full space-y-4 p-4 bg-gray-900  text-white rounded-lg shadow-lg shadow-slate-900'>
			<li onClick={() => closeModal()}>
				<NavLink
					to='/blogs'
					className={({ isActive }) =>
						`block px-4 py-2 rounded transition-colors duration-200 text-slate-300 ${
							isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
						}`
					}
				>
					Blogs
				</NavLink>
			</li>
			<li onClick={() => closeModal()}>
				<NavLink
					to='/my-blogs'
					className={({ isActive }) =>
						`block px-4 py-2 rounded transition-colors duration-200 text-slate-300 ${
							isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
						}`
					}
				>
					My Blogs
				</NavLink>
			</li>
			<li onClick={() => closeModal()}>
				<NavLink
					to='/about'
					className={({ isActive }) =>
						`block px-4 py-2 rounded transition-colors duration-200 text-slate-300 ${
							isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
						}`
					}
				>
					About
				</NavLink>
			</li>
			<li onClick={() => closeModal()}>
				<NavLink
					to='/add'
					className={({ isActive }) =>
						`block px-4 py-2 rounded transition-colors duration-200 text-slate-300 ${
							isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
						}`
					}
				>
					Add
				</NavLink>
			</li>
			{user.username && (
				<li onClick={() => closeModal()}>
					<p
						className='block px-4 py-2 rounded cursor-pointer hover:bg-gray-700 transition-colors duration-200 text-slate-300'
						onClick={() => onLogout()}
					>
						Logout
					</p>
				</li>
			)}
		</ul>
	);
};

export default Section;
