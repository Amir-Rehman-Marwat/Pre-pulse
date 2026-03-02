import axios from "axios"
import { data } from "react-router"

export const loginUser=async(email,password)=>{
const data={email,password}
   try {
     const response=await axios.post("http://localhost:3000/api/auth/login",data,{withCredentials:true})
    return response
   } catch (error) {
    return error
   }
}

export const registerUser=async(userName,email,password)=>{
const data={userName,email,password}
   try {
     const response=await axios.post("http://localhost:3000/api/auth/register",data,{withCredentials:true})
    return response
   } catch (error) {
    return error
   }
}

export const logOutUser=async()=>{
   try {
     const response=await axios.get("http://localhost:3000/api/auth/logout",{withCredentials:true})
    return response
   } catch (error) {
    return error
   }
}
export const getMe=async(userName,email,password)=>{
   try {
     const response=await axios.post("http://localhost:3000/api/auth/getMe",{withCredentials:true})
    return response
   } catch (error) {
    return error
   }
}