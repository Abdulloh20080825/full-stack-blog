export const validateFields = (user, oldPass, newPass, confirmPass) => {
	if (!oldPass || !newPass || !confirmPass) {
		return { query: 'all', message: 'All fields are required' };
	}
	if (oldPass !== user.password) {
		return { query: 'oldpass', message: 'Old password is incorrect' };
	}
	if (newPass === oldPass) {
		return {
			query: 'newpass',
			message: 'New password should not be the same as the old password',
		};
	}
	if (newPass !== confirmPass) {
		return {
			query: 'confirm',
			message: 'New password and confirmation do not match',
		};
	}
	return null;
};
