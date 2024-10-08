import { NavLink } from 'react-router-dom';
import { IoMenu } from 'react-icons/io5';
import { useState } from 'react';
import Section from './Section';
import NavigationModal from './Modal';

const Header = ({ user, onLogout }) => {
	const [openSection, setOpenSection] = useState(false);
	const handleOpenSection = () => setOpenSection(!openSection);
	const closeModal = () => setOpenSection(false);

	return (
		<div className='bg-gradient-to-r from-black to-slate-800 w-full h-[15vh] text-white'>
			<nav className='flex justify-between items-center w-full h-full px-5'>
				<p className='text-2xl sm:text-4xl font-medium tracking-widest'>
					Blo<span className='text-orange-600'>g</span>
				</p>
				<ul className='hidden lg:flex justify-between space-x-5 sm:space-x-10 font-bold text-[13px] sm:text-lg'>
					{user?.findUser?.username && (
						<>
							<li>
								<NavLink to='/'>Home</NavLink>
							</li>
							<li>
								<NavLink to='/blogs'>Blogs</NavLink>
							</li>
							<li>
								<NavLink to='/my-blogs'>My Blogs</NavLink>
							</li>
							<li>
								<NavLink to='/add'>Add</NavLink>
							</li>
							<li>
								<NavLink to='/settings'>Settings</NavLink>
							</li>
							{user.admin ? (
								<li>
									<NavLink to='/admin'>Admin</NavLink>
								</li>
							) : null}
							<li>
								<p className='cursor-pointer' onClick={onLogout}>
									Logout
								</p>
							</li>
						</>
					)}
				</ul>
				{user?.findUser?.username && (
					<>
						<IoMenu
							className='block lg:hidden text-3xl cursor-pointer mr-5'
							onClick={handleOpenSection}
						/>
					</>
				)}
			</nav>
			<NavigationModal isOpen={openSection} onClose={closeModal}>
				<Section user={user} onLogout={onLogout} closeModal={closeModal} />
			</NavigationModal>
		</div>
	);
};

export default Header;
