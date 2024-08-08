import { Route, Routes, useNavigate } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Add from './pages/Add';
import Blogs from './pages/Blogs';
import { useEffect, useState } from 'react';
import axiosInstance from './service/api';
import MyBlogs from './pages/MyBlogs';
import Blog from './pages/Blog';
import Header from './components/Header';
import EditBlog from './pages/EditBlog';

const App = () => {
	const [user, setUser] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		const getUserInfo = async () => {
			const data = await axiosInstance.get('/get-user');
			setUser(data?.data?.user);
		};
		if (localStorage.getItem('token')) {
			getUserInfo();
		}
	}, [localStorage.getItem('token')]);

	const onLogout = () => {
		localStorage.clear();
		setUser({});
		navigate('/login');
	};

	return (
		<div className=' h-screen w-screen bg-slate-900 overflow-x-hidden'>
			<div className='absolute -z-[2] bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
			<Header user={user} onLogout={onLogout} />
			<Routes>
				<Route path='/' element={<Main user={user} />}></Route>
				<Route path='/blogs' element={<Blogs user={user} />} />
				<Route path='/my-blogs' element={<MyBlogs />} />
				<Route path='/about' element={<About />} />
				<Route path='/add' element={<Add />} />
				<Route path='/blog/:id' element={<Blog />} />
				<Route path='/edit/:id' element={<EditBlog />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
			</Routes>
		</div>
	);
};

export default App;
