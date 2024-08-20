import { Route, Routes, useNavigate } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';
import Add from './pages/Add';
import Blogs from './pages/Blogs';
import { useEffect, useState } from 'react';
import axiosInstance from './service/api';
import MyBlogs from './pages/MyBlogs';
import Blog from './pages/Blog';
import Header from './components/Header';
import EditBlog from './pages/EditBlog';
import Settings from './pages/Settings';
import User from './components/User';
import Device from './components/Device';
import ChangePass from './components/ChangePass';
import Admin from './pages/Admin';
import AdminAllBlogs from './components/admin/Admin.AllBlogs';
import Users from './components/admin/Admin.AllUsers';
import UserProfile from './pages/UserProfile';

const App = () => {
	const [user, setUser] = useState({});
	const [adminUsers, setAdminUsers] = useState([]);
	const [adminBlogs, setAdminBlogs] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const getUserInfo = async () => {
			const data = await axiosInstance.get('/get-user');
			setUser(data?.data);
		};
		const getAdminBlogs = async function () {
			const data = await axiosInstance.get('/admin/all-blogs');
			setAdminBlogs(data.data);
		};
		const getAdminData = async function () {
			const res = await axiosInstance.get('/admin/get-users');
			setAdminUsers(res.data.users);
		};
		if (localStorage.getItem('token')) {
			getAdminData();
			getAdminBlogs();
			getUserInfo();
		}
	}, [localStorage.getItem('token')]);

	const onLogout = () => {
		localStorage.clear();
		setUser({});
		navigate('/login');
	};

	if (!user) {
		return (
			<div className='text-white'>
				<h1 className='text-4xl'>Loading...</h1>
			</div>
		);
	}

	return (
		<div className='h-screen w-screen bg-black overflow-x-hidden'>
			<div className='absolute -z-[2] bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#111_70%,transparent_100%)]'></div>
			<Header user={user} onLogout={onLogout} />
			<Routes>
				<Route path='/' element={<Main user={user} />}></Route>
				<Route path='/blogs' element={<Blogs user={user.findUser} />} />
				<Route path='/my-blogs' element={<MyBlogs />} />
				<Route path='/add' element={<Add />} />
				<Route path='/settings' element={<Settings />}>
					<Route path='user' element={<User user={user} />} />
					<Route path='device' element={<Device />} />
					<Route path='change' element={<ChangePass user={user} />} />
				</Route>
				<Route path='/admin' element={<Admin />}>
					<Route
						path='/admin/users'
						element={<Users adminUsers={adminUsers} />}
					/>
					<Route
						path='/admin/blogs'
						element={<AdminAllBlogs adminBlogs={adminBlogs} />}
					/>
				</Route>
				<Route path='/blog/:blog' element={<Blog user={user} />} />
				<Route path='/edit/:id' element={<EditBlog />} />
				<Route
					path='/profile/:id'
					element={<UserProfile user={user.findUser} />}
				/>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
			</Routes>
		</div>
	);
};

export default App;
