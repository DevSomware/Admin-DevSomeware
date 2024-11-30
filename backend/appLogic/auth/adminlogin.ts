import CryptoJS from "crypto-js";
import Admin from "../../models/Admin";
import jwt from "jsonwebtoken";
export const AdminLogin = async (req:any, res:any) => {
try{
const data = req.body;
//check the user is exists or not
const user = await Admin.findOne({email:data.email});
//if user not exists then return
if(user==null){
    return res.status(400).json({message:"Admin not exists",success:false});
}
//if user exists then check the password
const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET||"").toString(CryptoJS.enc.Utf8);
//check the password is correct or not
if(bytes==data.password){
    //generate the token
    const token = jwt.sign({id:user._id,role:user.role,email:user.email,name:user.name},process.env.JWT_SECRET||"");
    //update token in database
    await Admin.findByIdAndUpdate(user._id,{token:token});
    return res.status(200).json({message:"Admin logged in successfully",success:true,token:token,role:user.role,forgot:user.isforgot});
}
//if password is incorrect
return res.status(400).json({message:"Password is incorrect",success:false});
}
catch(err){
    return res.status(500).json({message:`Error in AdminLogin ${err}`,success:false});
}
}