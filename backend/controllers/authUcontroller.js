const User = require('../models/user');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authjwt');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;

async function registerUser(req,res){
    let {firstname, lastname, username, email, phonenumber, password} = req.body;

    try{
        const duplicate = await User.findOne({username});
        if(duplicate){
            return res.status(400).send({message:'username already exists'});
        }
        let user = new User({
            firstname,
            lastname,
            username,
            password,
            email,
            phonenumber,
            role:'user'
        });
        const result = await user.save();
        console.log(result);
        res.status(200).send({message:'User registered successfully', user: result});
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }

}

async function loginUser(req,res){
    try{
        const {username, password} =req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.status(401).send({message:'Username does not exist'})
        }
        const isPasswordValid = await user.comparePassword(password);
        if(!isPasswordValid){
            return res.status(401).send({message:'Wrong Password'});
        }
        let token = await jwt.sign(
            {userId:user?._id,
            role: 'user'
        },secretKey,{expiresIn:'3h'});
        let finalData = {
            userid:user?._id,
            username:user?.username,
            firstname:user?.firstname,
            lastname:user?.lastname,
            email:user?.email,
            phonenumber:user?.phonenumber,
            role: 'user',
            token
        }
        res.send(finalData)
    }catch(err){
        console.log(err)
        res.status(400).send(err)
    }
}

async function googleLogin(req, res) {
  console.log("Body received:", req.body);
  console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
  try {
    const { token } = req.body;

    if (!token) return res.status(400).json({ error: "Missing Google token" });

    const ticket = await client.verifyIdToken({
      idToken: token, 
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;
    const username = email.split("@")[0];

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        firstname: name,
        username,
        email,
        password: payload.sub,
        authProvider: 'google'
      });
      await user.save();
    }

    const jwtToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    return res.json({
      userid: user._id,
      username: user.username,
      firstname: user.firstname,
      email: user.email,
      token: jwtToken
    });

  } catch (err) {
    console.error("Google login error:", err);
    res.status(400).json({ error: "Google login failed" });
  }
}





const AuthUcontroller = {
    registerUser,
    loginUser,
    googleLogin
}

module.exports = AuthUcontroller;