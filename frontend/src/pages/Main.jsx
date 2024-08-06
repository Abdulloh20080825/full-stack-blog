import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!localStorage?.getItem('token')) {
			navigate('/login');
			return;
		}
		navigate('/blogs');
	}, []);

	return;
};

export default Main;
