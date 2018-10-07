const utils = require('util');
const jwt = require('jsonwebtoken');
//const jsonLint = require('jsonlint');
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

exports.check_field = (req,res,next)=>{
	if(utils.isUndefined(req.body.username) || utils.isUndefined(req.body.password))
	{
		return res.status(400).json({
			success:false,
			message: 'send username and password'
		});
	}
	next();
};

// exports.check_json = (req,res,next)=>{
// 	try{
// 		jsonLint.parse(JSON.stringify(req.body));
// 	}
// 	catch(err){
// 		return res.status(400).json({
// 			success:false,
// 			message: 'doc and/or patch should be json'
// 		});
// 	}
// 	 next();
	
// };


