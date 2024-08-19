const express = require('express');
const { authenticateToken } = require('../middleware/isAuth');
const adminController = require('../controllers/admin.controller');

const router = express.Router();

router.get('/get-users', adminController.allUsers);
router.get('/all-blogs', adminController.allBlogs)


module.exports = router;
