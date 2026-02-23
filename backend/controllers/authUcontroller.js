const User = require('../models/user');
const jwt = require('jsonwebtoken');

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





const AuthUcontroller = {
    registerUser,
    loginUser,
}

module.exports = AuthUcontroller;