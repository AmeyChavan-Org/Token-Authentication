const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const secretkey ="secretkey";

app.get("/",(req,resp)=>
{
	res.json({
		message:"a simple api"
	})
})
app.post("/login",(req,resp)=>
{
	const user={
		id:1,
		username:"anil",
		email:"ameychavan@gmail.com"
	}
	jwt.sign({user},secretkey,{expiresIn:'300s'},(err,token)=>{
		resp.json({
			token
			// here we have created the token 
		})
	})
})

// now to verify the token and access the account
app.post("/profile",verifyToken,(req,resp,secretkey)=>{
	//now we have to verify it
	jwt.verify(req.token,)


})

function verifyToken(req,resp,next) {

	const bearerHeader = req.headers['authorization'];
	if(typeof bearerHeader !== 'undefined')
	{
		// resp.send({
		// 	result:"this token is valid"
		// })

		const bearer = bearerHeader.split(" ");

		const token = bearer[1];
		req.token = token;
		next();
	}
	else
	{
		resp.send({
			result:"this token is invalid"
		})
	}
}
app.listen(5000,()=>{
	console.log("app is running on 5000 port");
})