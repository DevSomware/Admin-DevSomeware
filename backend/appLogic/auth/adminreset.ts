import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import Admin from "../../models/Admin";

export const AdminReset = async (req: any,res:any) => {
try{
let data = req.body;
//check the token is valid or not
let token = jwt.verify(data.token,process.env.JWT_SECRET||"");
if(token==null){
    return res.status(400).json({message:"Invalid token. Suspicious activity detected",success:false});
}
let user = await Admin.findOne({email: (token as jwt.JwtPayload).email});
//if provided token is not equal to the generated token then return the error
 //this is to prevent the bypass of the endpoint by the attacker to reset the password through any jwt get it by the user
if(user.token!=data.token){
    return res.status(400).json({message:"Invalid token. Suspicious activity detected",success:false});
}
//if everything is fine then update the password
let encryptedPassword = CryptoJS.AES.encrypt(data.password,process.env.AES_SECRET||"").toString();
await Admin.findByIdAndUpdate(user._id,{password:encryptedPassword,isforgot:false});
return res.status(200).json({message:"Password reset successfully",success:true});
}
catch(err){
    return res.status(500).json({message:`Error in PasswordReset ${err}`,success:false});  
}
}
