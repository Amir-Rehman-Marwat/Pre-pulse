import { useContext } from "react";
import { loginUser,registerUser } from "../services/auth.api";
import { AuthContext } from "../contexts/auth.context";
import React from "react";

const AuthHook = () => {
const context=useContext(AuthContext);
const {setUser,setLoading}=context;
  const handleLogin = async (email, password) => {
    try {
       setLoading(true)
      const response = await loginUser(email, password);

      if (response.status === 201) {
        setUser(response.data.user)
        setLoading(false)
        return response.data;
      } else if (response.status === 400) {
        setLoading(false)
        return response.response.data;
      } else {
        setLoading(false)
        return "Server errror...";
      }
    } catch (error) {
      return error;
    }
  };
  const handleRegister=async(userName,email,password)=>{
    try {
        setLoading(true)
        const response=await registerUser(userName,email,password)
        if(response.status===201){
            setLoading(false)
return response.data
        }else if(!response.status){
            setLoading(false)
            return  "server error"
        }else{
            setLoading(false)
            return  response.data
        }
    } catch (error) {
        return error
    }

  }
  return({handleLogin,handleRegister})
};

export default AuthHook;
