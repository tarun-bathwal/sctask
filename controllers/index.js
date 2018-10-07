const jwt = require('jsonwebtoken');
const jsonpatch = require('jsonpatch');
const sharp = require('sharp');
const axios = require('axios');
const fs=require('fs');
const request=require('request');
const path = require('path');


exports.login = (req,res,next) => {
	const username=req.body.username;
	const password=req.body.password;
	//make a jwt token using username and password
	let token = jwt.sign({  
		username,
		password
	},
	process.env.secret,   // secret used to make jwt token is accessed as an env variable
	{ expiresIn:'24h'});
	//return jwt token once logged in
	return res.status(200).json({
		success:true,
		message:'successfully logged in',
		token
	});
};


exports.apply_patch = (req,res,next) => {
	const doc = req.body.doc;
	const patch = req.body.patch;
	let patcheddoc;
	try{
		patcheddoc = jsonpatch.apply_patch(doc,patch); //apply patch on doc
	}
	catch(err) {
		res.status(500).json({
			success:false,
			message:err
			
		});
		return;
	}
	res.status(200).json({
		success:true,
		message:'successfully patched the json object',
		patcheddoc
	});
};




getImage = async (url,path) => {
	// axios image download with response type "stream"
	const response = await axios({
	  method: 'GET',
	  url: url,
	  responseType: 'stream'
	})
	// pipe the result stream into a file on disc
	response.data.pipe(fs.createWriteStream(path))
	// return a promise and resolve only when download finishes , reject on error
	return new Promise((resolve, reject) => {
	  response.data.on('end', () => {
		resolve();
	  });
	  response.data.on('error', () => {
		reject();
	  });
	});
}

exports.resize_thumbnail = async (req,res,next) =>{
	let url=req.body.url;
	let pos = url.split(".");
	let location = `./public/images/${req.userData.username}_${Date.now()}_input.${pos[pos.length-1]}`
	getImage(url,location)
	.then(()=>{
		let final_location=`./public/images/${req.userData.username}_${Date.now()}_output.${pos[pos.length-1]}`;
		sharp(location).resize(50,50).toFormat(pos[pos.length-1]).toFile(final_location,(err)=>{
			if(err)
			{
				res.status(500).json({
					message:err
				});
			}
			else{
				fs.unlink(location);
				res.sendFile(path.join(__dirname,`.${final_location}`));
			}
		});	
	})
	.catch((err)=>{
		res.status(500).json({
			message:"could not retrieve image",
			code : err.code
		});
	});

}
