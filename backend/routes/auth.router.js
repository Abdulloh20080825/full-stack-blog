const express = require('express');
const authController = require('../controllers/auth.controller');
const { authenticateToken } = require('../middleware/isAuth');

const router = express.Router();

router.post('/login', authController.login);
router.post('/create-account', authController.register);
router.post('/forgot-password', authController.forgotPassword);
router.get('/get-user', authenticateToken, authController.getUser);
router.post(
	'/change-password',
	authenticateToken,
	authController.changePassword
);
router.delete('/delete-account', authenticateToken, authController.deleteAccount);
router.get('/get-user-info/:id', authenticateToken, authController.getUserInfo)
;

module.exports = router;
