const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
	// Извлечение заголовка Authorization
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	// Если токен отсутствует, вернуть статус 401
	if (!token) {
		return res.status(401).json({ message: 'Access token is missing' });
	}

	// Проверка токена с использованием секретного ключа
	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			// Возвращаем статус 403 при ошибке токена (например, истекший срок действия)
			return res.status(403).json({ message: 'Invalid or expired token' });
		}

		// Если токен верен, добавляем пользователя к запросу
		req.user = user;
		next();
	});
};

module.exports = {
	authenticateToken,
};
