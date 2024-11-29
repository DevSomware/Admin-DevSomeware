import { Request, Response } from 'express';
import Admin from '../../models/Admin';
import Cryptojs from 'crypto-js';
export const AdminSignup = async (req:any,res:any)=> {
try{
const data = req.body;
//check the user is exists or not 
const user = await Admin.findOne({email:data.email});
//if user exists then return
if(user!=null){
    return res.status(400).json({message:"User already exists",success:false});
}
//if user not exists then create the user
const newUser = new Admin({
    username:data.username,
    name:data.name,
    email:data.email,
    password:Cryptojs.AES.encrypt(data.password,process.env.AES_SECRET||"").toString(),
    role:data.role,
});
await newUser.save();
return res.status(200).json({message:"User created successfully",success:true});

}
catch(err){
    return res.status(500).json({message:`Error in AdminSignup ${err}`,success:false});
}
}