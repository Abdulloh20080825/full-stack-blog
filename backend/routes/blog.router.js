const express = require('express');
const BlogController = require('../controllers/blog.controller');
const { authenticateToken } = require('../middleware/isAuth');

const router = express.Router();

router.post('/create-blog', authenticateToken, BlogController.create);
router.get('/view-blog/:id', authenticateToken, BlogController.view);
router.put('/update-blog/:id', authenticateToken, BlogController.edit);
router.delete('/delete-blog/:id', authenticateToken, BlogController.delete);
router.get('/get-all-blogs', authenticateToken, BlogController.getAll);
router.get('/get-my-blogs', authenticateToken, BlogController.getMy);
module.exports = router;
