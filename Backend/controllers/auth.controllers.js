import userModel from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
/**
 * @type Controller
 * @route api/auth/register
 * @description This will register the user based on usernnam,password and email
 * @acces public
 */
export const registerUserController=async(req,res)=>{
    console.log(req.body)
    const {userName,password,email}=req.body

    if(!userName ||  !password ||  !email){
       return  res.status(400).json({message:"user name ,email and password is required"})
    }

    const existsWithUserName=await userModel.findOne({userName})
    const existsWithEmail=await userModel.findOne({email})
if(existsWithEmail && existsWithUserName){
    return res.status(409)
    res.json({message:"An account already exists with this user name and email"})
}else if(existsWithEmail){
     return res.status(409)
     res.json({message:"An account already exists with this email"})
}else{
     return res.status(400).json({message:"An account already exists with this user name"})
}

 bcrypt.genSalt(15,function(err,salt){
bcrypt.hash(password,salt,async function(err,hash){
try {
     const registeredUser=await userModel.create({
    userName,
    email,
    password:hash
 })
 const token=jwt.sign({id:registeredUser._id,email:email},process.env.SECRET)
 return res.status(201)
 res.cookie("token",token)
 res.json({message:"user registered successfully"})

} catch (error) {
    console.log(error)
}

})
})



}
export const logineUserController=async (req,res)=>{
 
    const {email,password}=req.body
    const user=await userModel.findOne({email});
    if(!user){
        return res.status(400)
        res.json({message:"User not found ,email or password is incorrect  "})
    }
bcrypt.compare(password,user.password,function(err,matched){
    if(!matched){
return res.status(400).json({message:"Incorrect email  or password"})
    }else{
      const token=  jwt.sign({id:user._id,email:email},process.env.SECRET)
      return res.status(201)
      res.cookie("token",token)
      res.json({message:"User loged in successfully"})
    }
})






}