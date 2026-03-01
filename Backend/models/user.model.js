import mongoose from "mongoose";

// this user schema contain username,email and password of the user
const userSchema=new mongoose.Schema({
   userName:{
    type:String,
  unique:[true,"user name already exists"],
  required:true
   },
   email:{
    type:String,
    unique:[true,"account already exists with this email"],
    required:true
   },
   password:{
    type:String,
    required:true
   }
})

const userModel =mongoose.model("User",userSchema)
export default userModel;
