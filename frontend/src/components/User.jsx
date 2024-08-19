import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../service/api';

const User = ({ user }) => {
	const navigate = useNavigate();
	const onDeleteAccount = async () => {
		const answer = confirm('Are you want delete a your account ?');
		if (!answer) {
			return;
		} else {
			try {
				const data = await axiosInstance.delete('/delete-account');
				localStorage.clear();
				navigate('/login');
				alert('User deleted successfuly !!!');
			} catch (error) {
				console.log(error);
			}
		}
	};
	return (
		<div className='p-6 flex flex-col justify-between bg-gray-800 text-white rounded-lg shadow-md h-[50%]'>
			<div>
				<p className='text-center text-xl lg:text-4xl font-semibold mb-3 tracking-widest'>
					User Info
				</p>

				<div className='mb-4 flex flex-col md:flex-row items-start md:items-center sm:justify-between'>
					<div>
						<p className='text-sm lg:text-lg font-semibold'>
							Name: <span className='font-normal'>{user?.findUser?.name}</span>
						</p>
						<p className='text-sm lg:text-lg font-semibold'>
							Username:{' '}
							<span className='font-normal'>{user?.findUser?.username}</span>
						</p>
					</div>
					<div>
						<p className='text-[10px] lg:text-[16px] text-orange-400'>
							User created At:{' '}
							{moment(user.findUser?.createdAt).format('MM.Do.YYYY ')}
						</p>
						<p className='text-[10px] lg:text-[16px]'>
							At Time {moment(user.findUser?.createdAt).format('h:mm:ss a')}
						</p>
					</div>
				</div>
			</div>
			<div className='flex justify-between'>
				<p className='text-sm text-gray-400'>@Dedicated by Abdulloh</p>
				<button className='text-red-600' onClick={onDeleteAccount}>
					Delete account
				</button>
			</div>
		</div>
	);
};

export default User;
