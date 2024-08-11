const express = require('express');
const { authenticateToken } = require('../middleware/isAuth');
const deviceInfo = require('../controllers/device.info');

const router = express.Router();

router.get('/get-device-info', authenticateToken, deviceInfo.getDeviceInfo);

module.exports = router;
