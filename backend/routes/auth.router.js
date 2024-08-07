const express = require('express');
const authController = require('../controllers/auth.controller');
const { authenticateToken } = require('../middleware/isAuth');

const router = express.Router();

router.post('/login', authController.login);
router.post('/create-account', authController.register);
router.post('/get-user', authenticateToken, authController.getUser)

module.exports = router;
