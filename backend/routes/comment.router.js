const express = require('express');
const { authenticateToken } = require('../middleware/isAuth');
const commentController = require('../controllers/comment.controller');

const router = express.Router();

router.post('/comment/:blog', authenticateToken, commentController.comment);
router.get('/get-comment/:id', authenticateToken, commentController.getComment)
router.delete('/delete-comment/:blog/:id', authenticateToken, commentController.delete)

module.exports = router;
