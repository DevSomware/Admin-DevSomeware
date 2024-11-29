import jwt from 'jsonwebtoken';
export const SignupMiddleware = async (req:any,res:any,next:any)=>{
    try{
     const token = req.header('Authorization');
        if(!token){
            return res.status(401).json({message:"Authorization denied",success:false});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET||"");
        next();
    }
    catch(err){
        return res.status(500).json({message:`Error in SignupMiddleware ${err}`,success:false});
    }
}