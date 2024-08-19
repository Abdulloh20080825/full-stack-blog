import { Outlet, useNavigate } from 'react-router-dom';
import AdminLayout from '../components/admin/layout/AdminLayout';
import { useEffect } from 'react';

const Admin = () => {
	const navigate = useNavigate();
	useEffect(() => {
		navigate('/admin/users');
	}, []);
	return (
		<div className='flex'>
			<AdminLayout />
			<Outlet />
		</div>
	);
};

export default Admin;
