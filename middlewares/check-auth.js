const utils = require('util');
const jwt = require('jsonwebtoken');
//const jsonLint = require('jsonlint');
require('dotenv').config();

exports.verify = (req, res, next) => {
	try {
		//split the token with space as delimiter and token will be the second element of obtained array
		const token = req.headers.authorization.split(' ')[1];
		//verify the token against the secret stored in .env
		const decoded = jwt.verify(token, process.env.secret);
		//append the decoded data to the request object so that it can be used further.
		req.userData = decoded;
		next();
	} catch (error) {
		//in case of error, return the error and do not call next
		return res.status(401).json({
			success: false,
			message: 'unauthourized user',
		});
	}
};

exports.check_field = (req,res,next)=>{
	//check if username and password were both sent. They can be empty because they were to be arbitrary
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


