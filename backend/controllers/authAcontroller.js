const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const secretKey = process.env.JWT_SECRET;

async function registerAdmin(req,res){
    let {firstname, lastname, username, email, phonenumber, password} = req.body;

    try{
        const duplicate = await Admin.findOne({username});
        if(duplicate){
            return res.status(400).send({message:'username already exists'});
        }
        let admin = new Admin({
            firstname,
            lastname,
            username,
            password,
            email,
            phonenumber,
            role:'admin'
        });
        const result = await admin.save();
        console.log(result);
        res.status(200).send({message:'Admin registered successfully', admin: result});
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }

}

async function loginAdmin(req,res){
    try{
        const {username, password} =req.body;
        const admin = await Admin.findOne({username});
        if(!admin){
            return res.status(401).send({message:'Username does not exist'})
        }
        const isPasswordValid = await admin.comparePassword(password);
        if(!isPasswordValid){
            return res.status(401).send({message:'Wrong Password'});
        }
        let token = await jwt.sign(
            {userId:admin?._id,
            role: 'admin'
        },secretKey,{expiresIn:'3h'});
        let finalData = {
            userid:admin?._id,
            username:admin?.username,
            firstname:admin?.firstname,
            lastname:admin?.lastname,
            email:admin?.email,
            phonenumber:admin?.phonenumber,
            role: 'admin',
            token
        }
        res.send(finalData)
    }catch(err){
        console.log(err)
        res.status(400).send(err)
    }
}





const AuthAcontroller = {
    registerAdmin,
    loginAdmin,
}

module.exports = AuthAcontroller;