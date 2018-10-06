const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verify = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decoded = jwt.verify(token, process.env.secret);
		req.userData = decoded;
		next();
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: 'unauthourized user',
		});
	}
};


