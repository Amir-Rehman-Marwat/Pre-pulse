import blackListModel from "../models/blackListedTokens.model.js"
import jwt from "jsonwebtoken"
export const isLogiedIn=async(req,res,next)=>{
const token=req.cookies.token
if(!token){
    return res 
    .status(404)
    .json({message:"token not provided"})
}
const isBlaacklisted=await blackListModel.findOne({token})
if(isBlaacklisted){
    return res
    .status(404)
    .json({message:"invalid token"})
}
try {
    const decoded=jwt.verify(token,process.env.SECRET)
req.user={...decoded}
next()
} catch (error) {
    return res
    .json({message:"invalid token"})
}

}