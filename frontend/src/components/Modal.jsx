import React from 'react';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';

const NavigationModal = ({ isOpen, onClose, children }) => {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClose}
			className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75'
			overlayClassName='fixed inset-0'
			ariaHideApp={false}
		>
			<div className='relative bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto'>
				<button
					className='absolute top-2 right-2 text-white hover:text-gray-400'
					onClick={onClose}
				>
					<IoClose size={24} />
				</button>
				{children}
			</div>
		</Modal>
	);
};

export default NavigationModal;
